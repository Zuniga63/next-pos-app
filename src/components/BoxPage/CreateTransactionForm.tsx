import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  Checkbox,
  Modal,
  NumberInput,
  Textarea,
} from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconDeviceFloppy,
  IconX,
} from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IValidationErrors } from 'src/types';
import { cashFormatter, cashParser, currencyFormat } from 'src/utils';
import { DateInput, TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

import {
  boxPageSelector,
  hideTransactionForm,
  storeTransaction,
} from 'src/features/BoxPage';

const CreateTransactionForm = () => {
  const [date, setDate] = useState<Date | undefined | null>(undefined);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>(0);
  const [isExpense, setIsExpense] = useState(false);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);
  const timeInputRef = useRef<HTMLInputElement | null>(null);

  const {
    boxSelected: box,
    showingMainBox,
    storeTransactionFormOpened: opened,
    storeTransactionIsSuccess: isSuccess,
    storeTransactionError: error,
    storeTransactionLoading: loading,
  } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();

  const [balance, setBalance] = useState(0);

  const closeHandler = () => {
    if (!loading) {
      setDescription('');
      setAmount(0);
      setIsExpense(false);
      setErrors(null);
      dispatch(hideTransactionForm());
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
        amount < 0
          ? 'El importe no puede ser negativo.'
          : 'La transacción no puede ser cero (0)';
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
    let transactionDate = dayjs();
    const dateFormat = 'YYYY-MM-DD';
    const timeFormat = 'HH:mm';

    if (date && time) {
      const tempDate = dayjs(`${dayjs(date).format(dateFormat)} ${time}`);
      if (tempDate.isValid() && tempDate.isBefore(transactionDate)) {
        transactionDate = tempDate;
      } else if (tempDate.isToday()) {
        setTime(transactionDate.format(timeFormat));
      }
    } else if (date) {
      const tempDate = dayjs(date);
      if (tempDate.isValid() && !tempDate.isToday()) {
        transactionDate = tempDate.endOf('day');
      }
    } else if (time) {
      const tempDate = dayjs(`${dayjs().format(dateFormat)} ${time}`);
      if (tempDate.isValid() && tempDate.isBefore(transactionDate)) {
        transactionDate = tempDate;
      } else {
        setTime(transactionDate.format(timeFormat));
      }
    }

    return {
      transactionDate: transactionDate,
      description: description.trim(),
      amount: isExpense ? (amount as number) * -1 : (amount as number),
    };
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateData()) {
      const formData = getFormData();
      if (box) dispatch(storeTransaction({ boxId: box?.id, ...formData }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`¡Transacción Registrada!`);
      closeHandler();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (errors && errors.description?.message) {
      if (description.length > 0)
        setErrors(current => {
          if (current) {
            return { ...current, description: { value: null, message: '' } };
          }

          return current;
        });
    }
  }, [description]);

  useEffect(() => {
    if (errors && errors.amount?.message) {
      if (amount && amount > 0)
        setErrors(current => {
          if (current) {
            return { ...current, amount: { value: null, message: '' } };
          }

          return current;
        });
    }
  }, [amount]);

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

  useEffect(() => {
    if (showingMainBox) setBalance(0);
    else if (box?.balance) setBalance(box.balance);
    else setBalance(0);
  }, [showingMainBox, box?.balance]);

  return (
    <Modal
      opened={opened}
      onClose={closeHandler}
      size="sm"
      withCloseButton={false}
    >
      <form onSubmit={submitHandler} className="px-4 py-6">
        <header className="mb-4 border-b-2 pb-2 text-center">
          <h2 className="text-center text-xl font-bold">
            {' '}
            Registrar Transacción
          </h2>
          <p className="text-xs">
            {box?.name} ({currencyFormat(balance)})
          </p>
        </header>
        <div className="mb-4 py-4">
          {/* DATE AND TIME */}
          <div className="gap-x-2 md:mb-2 md:grid md:grid-cols-5">
            {/* Date */}
            <DateInput
              label="Fecha"
              locale="es-do"
              placeholder="Selecciona una fecha"
              value={date}
              onChange={setDate}
              minDate={box?.openBox ? dayjs(box?.openBox).toDate() : undefined}
              maxDate={dayjs().toDate()}
              className="mb-2 md:col-span-3 md:mb-0"
              icon={<IconCalendar size={16} />}
              error={errors?.transactionDate?.message}
              clearable
            />
            {/* Time */}
            <TimeInput
              label="Hora"
              placeholder="Ingresala aquí."
              ref={timeInputRef}
              value={time}
              onChange={({ currentTarget }) => setTime(currentTarget.value)}
              className="mb-2 md:col-span-2 md:mb-0"
              rightSection={
                <ActionIcon onClick={() => timeInputRef.current?.showPicker()}>
                  <IconClock size="1rem" stroke={1.5} />
                </ActionIcon>
              }
            />
          </div>

          {/* Description */}
          <Textarea
            label="Descripción"
            withAsterisk
            placeholder="Describe el movimiento aquí."
            className="mb-2"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            error={errors?.description.message}
          />

          {/* Amount */}
          <NumberInput
            label="Importe"
            placeholder="Escribe el importe aquí."
            className="mb-4"
            hideControls
            min={1}
            step={100}
            value={amount}
            onChange={value => setAmount(value)}
            onFocus={({ target }) => target.select()}
            error={errors?.amount?.message}
            parser={cashParser}
            formatter={cashFormatter}
            withAsterisk
          />
          {/* Check */}
          <Checkbox
            label="Es un egreso."
            checked={isExpense}
            onChange={({ currentTarget }) =>
              setIsExpense(currentTarget.checked)
            }
          />
        </div>
        <footer className="flex items-center justify-between">
          <Button
            leftIcon={<IconX size={14} stroke={4} />}
            color="red"
            type="button"
            disabled={loading}
            size="xs"
            onClick={closeHandler}
          >
            Cancelar
          </Button>

          <Button
            leftIcon={<IconDeviceFloppy size={14} stroke={2} />}
            loading={loading}
            type="submit"
            size="xs"
            color={isExpense ? 'orange' : 'green'}
          >
            {isExpense ? 'Guardar Egreso' : 'Guardar Ingreso'}
          </Button>
        </footer>
      </form>
    </Modal>
  );
  return <div>CreateTransactionForm</div>;
};

export default CreateTransactionForm;
