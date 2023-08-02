import { useCreateMinorBox } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IValidationErrors } from '@/types';
import axios from 'axios';
import { useEffect, useId, useState } from 'react';

export function useCashboxForm() {
  const formId = useId();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const formOpened = useCashboxesStore(state => state.cashboxFormOpened);
  const closeForm = useCashboxesStore(state => state.hideCashboxForm);

  const { mutate, isLoading, isSuccess, isError, error } = useCreateMinorBox();

  const close = () => {
    if (isLoading) return;
    setName('');
    setErrors(null);
    closeForm();
  };

  const updateName = (value: string) => {
    setName(value);
  };

  const submit = () => {
    if (isLoading) return;
    mutate({ name: name.trim() });
  };

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
      }
    }
  }, [isError]);

  return {
    formId,
    name,
    isOpen: formOpened,
    errors,
    isLoading,
    close,
    updateName,
    submit,
  };
}
