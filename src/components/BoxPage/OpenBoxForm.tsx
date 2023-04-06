import { FormEvent, useEffect, useState } from 'react';
import { Button, Checkbox, Modal, NumberInput } from '@mantine/core';
import { IconLockOpen } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import {
  boxPageSelector,
  unmountBoxToOpen,
  openBox,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IValidationErrors } from 'src/types';
import { cashFormatter, cashParser, currencyFormat } from 'src/utils';
import dayjs from 'dayjs';
import CashBoxBankNotes from './CashBoxBankNotes';

const OpenBoxForm = () => {
  const [opened, setOpened] = useState(false);
  const [base, setBase] = useState<number | ''>(0);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);
  const [coinAmount, setCoinAmount] = useState(0);
  const [bankNotesAmount, setBankNotesAmount] = useState(0);
  const [checked, setChecked] = useState(false);

  const {
    boxToOpen: box,
    openBoxIsSuccess: isSuccess,
    openBoxError: error,
    openBoxLoading: loading,
  } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    if (!loading) {
      setErrors(null);
      setOpened(false);
      setChecked(false);
      setTimeout(() => {
        setBase('');
        dispatch(unmountBoxToOpen());
      }, 150);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (box && typeof base === 'number' && base >= 0) {
      const data = {
        boxId: box.id,
        base,
        date: dayjs().toDate(),
      };
      dispatch(openBox(data));
    }
  };

  useEffect(() => {
    if (box) setOpened(true);
    else setOpened(false);
  }, [box]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Caja abierta con una base de ${currencyFormat(base)}`);
      closeHandler();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (checked) {
      setBase(coinAmount + bankNotesAmount);
    } else {
      setCoinAmount(0);
      setBankNotesAmount(0);
    }
  }, [checked, coinAmount, bankNotesAmount]);

  useEffect(() => {
    if (error) {
      const { data, status } = error;
      if (status === 422 && data.errors) {
        setErrors(data.errors);
      } else if (status === 401) {
        toast.error(data.message);
      } else {
        console.log(error);
      }
    }
  }, [error]);

  return (
    <Modal
      opened={opened}
      onClose={closeHandler}
      size="xl"
      title={<p className="text-xl font-bold"> {box?.name}</p>}
      padding="lg"
      transitionProps={{ duration: 150 }}
    >
      <form onSubmit={submitHandler}>
        <div className="mb-4 flex flex-col gap-y-2 lg:grid lg:grid-cols-4 lg:items-center lg:gap-y-0 lg:gap-x-12">
          <div className="lg:col-span-3">
            <NumberInput
              label="Base"
              required
              placeholder="Escribe la base aquí"
              className="mb-4"
              readOnly={checked}
              hideControls
              min={0}
              step={100}
              value={base}
              onChange={setBase}
              onFocus={e => e.currentTarget.select()}
              error={errors?.base?.message}
              parser={cashParser}
              formatter={cashFormatter}
            />
            <Checkbox
              label="Ingresar billetes y monedas"
              checked={checked}
              onChange={({ currentTarget }) =>
                setChecked(currentTarget.checked)
              }
              className="mb-4"
            />
          </div>

          <Button
            leftIcon={<IconLockOpen size={18} />}
            loading={loading}
            type="submit"
            size="xs"
          >
            Abrir Caja
          </Button>
        </div>

        {checked ? (
          <div className="mb-16 grid gap-x-4 lg:grid-cols-2">
            {/* COINS */}
            <CashBoxBankNotes
              amount={coinAmount}
              onChange={setCoinAmount}
              coins
            />

            {/* BANK NOTES */}
            <CashBoxBankNotes
              amount={bankNotesAmount}
              onChange={setBankNotesAmount}
            />
          </div>
        ) : null}
      </form>
    </Modal>
  );
};

export default OpenBoxForm;
