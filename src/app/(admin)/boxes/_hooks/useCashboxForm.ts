import { useCreateMinorBox, useGetMinorBoxes, useUpdateMinorBox } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IValidationErrors } from '@/types';
import axios from 'axios';
import { useEffect, useId, useMemo, useState } from 'react';

export function useCashboxForm() {
  const formId = useId();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);
  const [isCreate, setIsCreate] = useState(true);

  const formOpened = useCashboxesStore(state => state.cashboxFormOpened);
  const cashboxId = useCashboxesStore(state => state.cashboxIdToEdit);
  const closeForm = useCashboxesStore(state => state.hideCashboxForm);
  const { data: boxes } = useGetMinorBoxes();

  const {
    mutate: createCashbox,
    isLoading: createIsLoading,
    isSuccess: createIsSuccess,
    isError: createIsError,
    error: createError,
  } = useCreateMinorBox();

  const {
    mutate: updateMinorBox,
    isLoading: updateIsLoading,
    isSuccess: updateIsSuccess,
    isError: updateIsError,
    error: updateError,
  } = useUpdateMinorBox();

  const isLoading = useMemo(() => Boolean(createIsLoading || updateIsLoading), [createIsLoading, updateIsLoading]);
  const isSuccess = useMemo(() => Boolean(createIsSuccess || updateIsSuccess), [createIsSuccess, updateIsSuccess]);
  const isError = useMemo(() => createIsError || updateIsError, [createIsError, updateIsError]);
  const error = useMemo(() => updateError || createError, [updateError, createError]);

  const close = () => {
    if (isLoading) return;
    setName('');
    setErrors(null);
    setIsCreate(true);
    closeForm();
  };

  const updateName = (value: string) => {
    setName(value);
  };

  const submit = () => {
    if (isLoading) return;
    if (isCreate) createCashbox({ name: name.trim() });
    else if (cashboxId) updateMinorBox({ name: name.trim(), id: cashboxId });
  };

  useEffect(() => {
    if (!isSuccess) return;
    close();
  }, [isSuccess]);

  useEffect(() => {
    const cashbox = boxes?.find(box => box.id === cashboxId);
    if (!cashbox) return;

    setName(cashbox.name);
    setIsCreate(false);
  }, [cashboxId]);

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
    isCreate,
    close,
    updateName,
    submit,
  };
}
