import { useCloseMinorBox, useGetMinorBoxes } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IBox, IValidationErrors } from '@/types';
import axios from 'axios';
import { useEffect, useId, useState } from 'react';

export function useCloseBoxForm() {
  const formId = useId();
  const [box, setBox] = useState<IBox | null>(null);
  const [cash, setCash] = useState<number | string>('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const cashboxId = useCashboxesStore(state => state.cashboxIdToClose);
  const closeForm = useCashboxesStore(state => state.unmountBoxToClose);
  const { data: boxes } = useGetMinorBoxes();

  const { mutate, isLoading, isSuccess, isError, error } = useCloseMinorBox();

  const close = () => {
    if (isLoading) return;
    closeForm();
    setBox(null);
    setCash('');
    setErrors(null);
    setIsOpen(false);
  };

  const updateCash = (value: string) => {
    const baseValue = Number(value);
    if (isNaN(baseValue)) setCash('');
    setCash(baseValue);
  };

  const submit = () => {
    if (isLoading || typeof cash === 'undefined' || !cashboxId) return;
    mutate({ cash: Number(cash), boxId: cashboxId });
  };

  useEffect(() => {
    console.log(cashboxId);
    const boxData = boxes?.find(item => item.id === cashboxId);
    if (!boxData) {
      if (isOpen) close();
      return;
    }
    setBox(boxData);
    setIsOpen(true);
  }, [cashboxId]);

  useEffect(() => {
    if (!isSuccess) return;
    close();
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;
    if (axios.isAxiosError(error) && error.response) {
      const { data, status } = error.response;
      if ((status === 422 || status === 400) && data.errors) {
        setErrors(data.errors);
      } else if (status === 404) close();
    }
  }, [isError]);

  return { formId, cash, errors, isOpen, box, isLoading, updateCash, submit, close };
}
