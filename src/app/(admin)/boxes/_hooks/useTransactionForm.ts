import { useGetMinorBoxes, useStoreTransaction } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IBox, IValidationErrors } from '@/types';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export enum TransactionPropertyEnum {
  IS_RIGHT_NOW = 'right_now',
  DATE = 'transaction_date',
  TIME = 'transaction_time',
  DESCRIPTION = 'transaction_description',
  AMOUNT = 'transaction_amount',
  IS_EXPENSE = 'is_expense',
}

export function useTransactionForm() {
  const isOpen = useCashboxesStore(state => state.transactionFormOpened);
  const boxId = useCashboxesStore(state => state.cashboxIdToShow);
  const isGlobal = useCashboxesStore(state => state.isGlobal);
  const closeForm = useCashboxesStore(state => state.hideTransactionForm);

  const [isRigthNow, setIsRightNow] = useState(true);
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>(0);
  const [isExpense, setIsExpense] = useState(false);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const [cashbox, setCashbox] = useState<IBox | null>(null);
  const { data: boxes } = useGetMinorBoxes();

  const { mutate, isLoading, isSuccess, isError, error } = useStoreTransaction();

  const updateAmount = (value: number) => {
    if (isNaN(value)) setAmount('');
    else setAmount(value);
  };

  const updateTransactionDate = (value: Date | null) => {
    if (value) {
      const now = dayjs();
      if (now.isBefore(value)) setTransactionDate(now.toDate());
      else if (cashbox && cashbox.openBox) {
        const openBox = dayjs(cashbox.openBox);
        if (openBox.isValid() && openBox.isAfter(value)) setTransactionDate(openBox.toDate());
        else setTransactionDate(value);
      }
      return;
    }

    setTransactionDate(value);
  };

  const updateForm = (value: boolean | string, propertyName: TransactionPropertyEnum) => {
    if (typeof value === 'boolean') {
      if (propertyName === TransactionPropertyEnum.IS_RIGHT_NOW) setIsRightNow(value);
      else if (propertyName === TransactionPropertyEnum.IS_EXPENSE) setIsExpense(value);
    } else {
      if (propertyName === TransactionPropertyEnum.DESCRIPTION) setDescription(value);
    }
  };

  const validateData = () => {
    let isOk = true;
    const validationError: IValidationErrors = {
      amount: {
        value: amount,
        message: '',
      },
      description: {
        value: description,
        message: '',
      },
    };
    setErrors(null);

    if (typeof amount !== 'number') {
      validationError.amount.message = 'Este campo es requerido';
      isOk = false;
    } else if (typeof amount === 'number' && amount <= 0) {
      validationError.amount.message =
        amount < 0 ? 'El importe no puede ser negativo.' : 'La transacción no puede ser cero (0)';
      isOk = false;
    }

    if (!description || description.trim().length === 0) {
      validationError.description.message = 'La descripción es requerida.';
      isOk = false;
    }

    if (!isOk) {
      setErrors(validationError);
    }

    return isOk;
  };

  const getFormData = () => {
    let date = dayjs();

    if (!isRigthNow && transactionDate) {
      const tempDate = dayjs(transactionDate);
      if (tempDate.isValid()) date = tempDate;
    }

    return {
      transactionDate: date,
      description: description.trim(),
      amount: isExpense ? (amount as number) * -1 : (amount as number),
    };
  };

  const reset = () => {
    setDescription('');
    setAmount(0);
    setIsExpense(false);
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
    mutate({ boxId, isGlobal, data });
  };

  useEffect(() => {
    if (!isOpen || isGlobal || !boxId) {
      setCashbox(null);
      return;
    }
    const box = boxes?.find(({ id }) => boxId === id);
    if (box) setCashbox(box);
  }, [isOpen, boxId, isGlobal]);

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
      isCreate: true,
      isRigthNow,
      transactionDate,
      description,
      amount,
      isExpense,
      isLoading,
    },
    errors,
    isOpen,
    cashbox,
    updateForm,
    updateAmount,
    updateTransactionDate,
    submit,
    closeModal,
  };
}
