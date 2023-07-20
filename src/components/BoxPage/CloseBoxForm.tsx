import { Button, Checkbox, Modal, NumberInput, Textarea } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { boxPageSelector, closeBox, unmountBoxToClose } from '@/features/BoxPage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IValidationErrors } from '@/types';
import { cashFormatter, cashParser, currencyFormat } from '@/utils';
import CashBoxBankNotes from './CashBoxBankNotes';

function CloseBoxForm() {
  const [opened, setOpened] = useState(false);
  const [cash, setCash] = useState<number | ''>(0);
  const [observation, setObservation] = useState('');
  const [leftover, setLeftover] = useState(0);
  const [missing, setMissign] = useState(0);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const [coinAmount, setCoinAmount] = useState(0);
  const [bankNotesAmount, setBankNotesAmount] = useState(0);
  const [checked, setChecked] = useState(false);

  const {
    boxToClose: box,
    closeBoxIsSuccess: isSuccess,
    closeBoxError: error,
    closeBoxLoading: loading,
  } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    if (!loading) {
      setCash(0);
      setChecked(false);
      setObservation('');
      setErrors(null);
      setOpened(false);
      setTimeout(() => {
        dispatch(unmountBoxToClose());
      }, 150);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (box && typeof cash === 'number') {
      const data = {
        boxId: box.id,
        cash,
        observation: observation || undefined,
      };
      dispatch(closeBox(data));
    }
  };

  useEffect(() => {
    if (box) setOpened(true);
    else setOpened(false);
  }, [box]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`¡Caja cerrada con éxito!`);
      closeHandler();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!checked) {
      setCoinAmount(0);
      setBankNotesAmount(0);
    }
  }, [checked]);

  useEffect(() => {
    if (checked) {
      setCash(coinAmount + bankNotesAmount);
    }
  }, [coinAmount, bankNotesAmount]);

  useEffect(() => {
    if (error) {
      const { data, status } = error;
      if (status === 400 && data.errors) {
        setErrors(data.errors);
      } else if (status === 401) {
        toast.error(data.errorMessage);
      } else {
        console.log(error);
      }
    }
  }, [error]);

  useEffect(() => {
    setLeftover(0);
    setMissign(0);

    if (typeof cash === 'number' && cash >= 0 && box && typeof box.balance !== 'undefined') {
      if (cash > box.balance) setLeftover(cash - box.balance);
      else if (cash < box.balance) setMissign(box.balance - cash);
    }
  }, [cash]);

  return (
    <Modal
      opened={opened}
      onClose={closeHandler}
      size="xl"
      title={<p className="text-center text-xl font-bold">{box?.name}</p>}
      padding="xl"
    >
      <form onSubmit={submitHandler}>
        <div className="mb-8 grid gap-x-8 gap-y-4 lg:grid-cols-2">
          <div>
            <NumberInput
              label="Dinero"
              required
              placeholder="Escribe la base aquí"
              hideControls
              min={0}
              step={100}
              value={cash}
              onChange={value => setCash(value)}
              onFocus={({ target }) => target.select()}
              error={errors?.cash?.message}
              parser={cashParser}
              formatter={cashFormatter}
              className="mb-2"
              readOnly={checked}
            />
            <Textarea
              label="Observación"
              placeholder="Una observación del cierre de caja"
              onChange={({ target }) => setObservation(target.value)}
              error={errors?.observation?.message}
              className="mb-2"
            />

            <Checkbox
              label="Ingresar billetes y monedas"
              checked={checked}
              onChange={({ currentTarget }) => setChecked(currentTarget.checked)}
            />
          </div>

          <div className="flex flex-col justify-between gap-y-2">
            <div className="mx-auto min-h-[60px] w-10/12 overflow-hidden rounded-lg bg-light bg-opacity-20">
              <h2 className="bg-amber-900 bg-opacity-80 py-2 text-center text-lg font-bold">Resumen</h2>
              <div className="px-4 py-2">
                {/* BALANCE */}
                <div className="grid grid-cols-2 border-b border-dashed">
                  <p className="border-r border-dashed py-1  pr-2 text-right">Saldo:</p>
                  <p className="py-1 text-right font-bold  tracking-widest">{currencyFormat(box?.balance)}</p>
                </div>

                {/* LETFOVER */}
                {leftover > 0 ? (
                  <div className="grid grid-cols-2">
                    <p className="border-r border-dashed py-1  pr-2 text-right">Sobrante:</p>
                    <p className="py-1 text-right font-bold  tracking-widest">{currencyFormat(leftover)}</p>
                  </div>
                ) : null}

                {/* MISSING */}
                {missing > 0 ? (
                  <div className="grid grid-cols-2">
                    <p className="border-r border-dashed py-1  pr-2 text-right">Faltante:</p>
                    <p className="py-1 text-right font-bold  tracking-widest">{currencyFormat(missing)}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <Button leftIcon={<IconLock />} loading={loading} type="submit" fullWidth>
              Cerrar Caja
            </Button>
          </div>
        </div>

        {/* BANK NOTES */}
        {checked ? (
          <div className="mb-16 grid gap-x-4 gap-y-2 lg:grid-cols-2">
            {/* COINS */}
            <CashBoxBankNotes amount={coinAmount} onChange={setCoinAmount} coins />

            {/* BANK NOTES */}
            <CashBoxBankNotes amount={bankNotesAmount} onChange={setBankNotesAmount} />
          </div>
        ) : null}
      </form>
    </Modal>
  );
}

export default CloseBoxForm;
