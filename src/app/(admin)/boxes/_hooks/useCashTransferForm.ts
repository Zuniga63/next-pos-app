import { useGetMinorBoxes, useStoreCashTransfer } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IBox, ICashTransferRequest, IValidationErrors } from '@/types';
import { AxiosError } from 'axios';
import { SingleValue } from 'chakra-react-select';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

export function useCashTransferForm() {
  const isOpen = useCashboxesStore(state => state.cashTransferFormOpened);
  const boxId = useCashboxesStore(state => state.cashboxIdToShow);
  const closeForm = useCashboxesStore(state => state.hideCashTransferForm);

  const [addresseeBox, setAddressBox] = useState<SingleValue<{ label: string; value: string }>>();
  const [amount, setAmount] = useState<number | ''>(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const { data: boxes } = useGetMinorBoxes();
  const [cashbox, setCashbox] = useState<IBox | null>(null);

  const addresseeBoxes: IBox[] = useMemo(() => {
    if (!boxId || !boxes) return [];
    return boxes.filter(box => box.id !== boxId && box.openBox);
  }, [boxId, boxes]);

  const { mutate, isLoading, isSuccess, isError, error } = useStoreCashTransfer();

  const updateAmount = (value: number) => {
    if (isNaN(value)) setAmount('');
    else setAmount(value);
  };

  const validateData = () => {
    let isOk = true;
    const validationError: IValidationErrors = {
      amount: {
        value: amount,
        message: '',
      },
      addresseeBoxId: {
        value: addresseeBox,
        message: '',
      },
    };
    setErrors(null);

    if (typeof amount !== 'number') {
      validationError.amount.message = 'Este campo es requerido';
      isOk = false;
    } else if (typeof amount === 'number' && amount <= 0) {
      validationError.amount.message =
        amount < 0 ? 'El importe no puede ser negativo.' : 'La transferencia no puede ser cero (0)';
      isOk = false;
    }

    if (!addresseeBox) {
      validationError.addresseeBoxId.message = 'Se debe seleccionar una caja destino';
      isOk = false;
    }

    if (!isOk) {
      setErrors(validationError);
    }

    return isOk;
  };

  const getFormData = (): ICashTransferRequest => {
    return {
      transferDate: dayjs(),
      senderBoxId: boxId || '',
      addresseeBoxId: addresseeBox?.value || '',
      amount: typeof amount === 'number' ? amount : 0,
      description: description || undefined,
    };
  };

  const reset = () => {
    setAmount('');
    setAddressBox(undefined);
    setErrors(null);
    setErrors(null);
  };

  const closeModal = () => {
    if (isLoading) return;

    closeForm();
    reset();
  };

  const submit = () => {
    if (isLoading || !validateData()) return;
    const data = getFormData();
    mutate({ data });
  };

  useEffect(() => {
    if (!isOpen || !boxId) return;
    const box = boxes?.find(({ id }) => boxId === id);
    if (box) setCashbox(box);
  }, [isOpen, boxId]);

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess]);

  useEffect(() => {
    if (!isError || !error) return;

    if (error instanceof AxiosError) {
      const { response } = error;
      const data = response?.data;

      if (data && (response.status === 422 || response.status === 400) && data.validationErrors) {
        setErrors(data.validationErrors);
      }
    }
  }, [isError]);

  return {
    form: {
      amount,
      description,
      addresseeBox,
      isLoading,
    },
    errors,
    isOpen,
    cashbox,
    addresseeBoxes,
    updateAmount,
    setDescription,
    setAddressBox,
    submit,
    closeModal,
  };
}
