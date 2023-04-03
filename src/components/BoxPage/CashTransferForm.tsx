import {
  Button,
  Modal,
  Notification,
  NumberInput,
  Select,
} from '@mantine/core';
import { IconArrowsExchange2, IconX } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  boxPageSelector,
  hideCashTransferForm,
  storeCashTransfer,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ICashTransferRequest, IValidationErrors } from 'src/types';
import { cashFormatter, cashParser, currencyFormat } from 'src/utils';

const CashTransferForm = () => {
  const {
    boxes,
    boxSelected,
    cashTransferFormOpened: opened,
    cashTransferLoading: loading,
    cashTransferIsSuccess: isSuccess,
    cashTransferError: error,
  } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();

  const [addresseeBox, setAddressBox] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | ''>(0);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const close = () => {
    if (!loading) {
      setAmount('');
      setAddressBox(null);
      setErrors(null);
      dispatch(hideCashTransferForm());
    }
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
        amount < 0
          ? 'El importe no puede ser negativo.'
          : 'La transferencia no puede ser cero (0)';
      isOk = false;
    }

    if (!addresseeBox) {
      validationError.addresseeBoxId.message =
        'Se debe seleccionar una caja destino';
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
      senderBoxId: boxSelected?.id || '',
      addresseeBoxId: addresseeBox || '',
      amount: typeof amount === 'number' ? amount : 0,
    };
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateData()) {
      const formData = getFormData();
      dispatch(storeCashTransfer(formData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`¡Transferencia de fondos exitosa!`);
      close();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const data = response?.data;

        if (data) {
          if (response.status === 422 && data.validationErrors) {
            setErrors(data.validationErrors);
          } else if (response.status === 401) {
            toast.error(response.data.message);
          } else {
            console.log(error);
          }
        }
      } else {
        console.log(error);
      }
    }
  }, [error]);

  return (
    <Modal opened={opened} title="Transferir fondos" onClose={close}>
      {/* SENDER BOX */}
      <div className="mb-6 rounded-md border border-amber-400 px-4 py-2">
        <p className="mb-2 border-b border-amber-500 text-center text-lg font-bold tracking-wider">
          Caja Origen
        </p>
        <div className="flex items-center justify-between gap-x-4 px-4">
          <h3 className="text-center text-xs italic line-clamp-2">
            {boxSelected?.name}
          </h3>
          <p className="text-xs font-bold tracking-widest">
            {currencyFormat(boxSelected?.balance)}
          </p>
        </div>
        {errors?.senderBoxId?.message ? (
          <Notification
            color="red"
            icon={<IconX size="1rem" />}
            className="mt-4"
            withCloseButton={false}
          >
            {errors.senderBoxId.message}
          </Notification>
        ) : null}
      </div>

      <form onSubmit={submitHandler}>
        {/* ADDRESSEE BOX */}
        <Select
          label="Caja destino"
          placeholder="Selecciona una caja"
          searchable
          withAsterisk
          withinPortal
          clearable
          className="mb-4"
          value={addresseeBox}
          onChange={setAddressBox}
          data={boxes
            .filter(box => box.id !== boxSelected?.id && box.openBox)
            .map(box => ({ label: box.name, value: box.id }))}
          error={errors?.addresseeBoxId?.message}
        />

        <NumberInput
          label="Importe"
          placeholder="Escribe el valor a transferir"
          className="mb-4"
          hideControls
          min={0}
          max={boxSelected?.balance}
          step={100}
          parser={cashParser}
          formatter={cashFormatter}
          withAsterisk
          onFocus={({ target }) => target.select()}
          value={amount}
          onChange={value => setAmount(value)}
          error={errors?.amount?.message}
        />

        <footer className="flex items-center justify-between">
          <Button
            leftIcon={<IconX size={14} stroke={4} />}
            color="red"
            type="button"
            disabled={loading}
            size="xs"
            onClick={close}
          >
            Cancelar
          </Button>

          <Button
            leftIcon={<IconArrowsExchange2 size={14} stroke={2} />}
            loading={loading}
            type="submit"
            size="xs"
          >
            Transferir Fondos
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default CashTransferForm;
