import { useGetMinorBoxes, useOpenMinorBox } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IBox, IValidationErrors } from '@/types';
import axios from 'axios';
import { useEffect, useId, useState } from 'react';

export function useOpenBoxForm() {
  const formId = useId();
  const [box, setBox] = useState<IBox | null>(null);
  const [base, setBase] = useState<number | string>('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const cashboxId = useCashboxesStore(state => state.cashboxIdToOpen);
  const closeForm = useCashboxesStore(state => state.unmountBoxToOpen);
  const { data: boxes } = useGetMinorBoxes();

  const { mutate, isLoading, isSuccess, isError, error } = useOpenMinorBox();

  const close = () => {
    if (isLoading) return;
    closeForm();
    setBox(null);
    setBase('');
    setErrors(null);
    setIsOpen(false);
  };

  const updateBase = (value: number) => {
    if (isNaN(value)) setBase('');
    setBase(value);
  };

  const submit = () => {
    if (isLoading || typeof base === 'undefined' || !cashboxId) return;
    mutate({ base: Number(base), boxId: cashboxId });
  };

  useEffect(() => {
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

  return { formId, base, errors, isOpen, box, isLoading, updateBase, submit, close };
}
