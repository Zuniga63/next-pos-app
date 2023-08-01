'use client';

import { createMinorBox } from '@/services/boxes.service';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IValidationErrors } from '@/types';
import { ServerStateKeysEnum } from '@/utils/server-state-key.enum';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useId, useState } from 'react';

export function useCreateMinorBox() {
  const formId = useId();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);
  const toast = useToast({ position: 'top-left' });

  const formOpened = useCashboxesStore(state => state.cashboxFormOpened);
  const closeForm = useCashboxesStore(state => state.hideCashboxForm);

  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: createMinorBox,
    onSuccess(data) {
      toast({
        title: '¡Caja Guardada!',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [ServerStateKeysEnum.MinorBoxes] });
    },
    onError(error) {
      let message = '¡Opp, algo salio mal!';
      let showAlert = true;

      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;

        if ((status === 422 || status === 400) && data.errors) {
          setErrors(data.errors);
          showAlert = false;
        } else if (status === 401) {
          message = data.errorMessage;
        }
      }
      if (showAlert) toast({ title: message, status: 'error' });
    },
  });

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
