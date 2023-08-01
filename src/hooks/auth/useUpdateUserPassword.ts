import { updateUserPassword } from '@/services/auth.service';
import { IValidationErrors, UpdatePasswordRequest } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export function useUpdateUserPassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const toast = useToast({ position: 'top-left' });

  const {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    reset: resetQuery,
  } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess() {
      toast({ title: '¡Contrasela actualizada!', status: 'success' });
    },
    onError() {
      toast({
        title: '¡Opps, algo salió mal!',
        description: 'No se pudo hacer la actualización, verifica las credenciales o intentalo nuevamente mas tarde',
        status: 'error',
      });
    },
  });

  const reset = () => {
    if (isLoading) return;

    setPassword('');
    setNewPassword('');
    setPasswordConfirm('');
    setErrors(null);
    resetQuery();
  };

  const getFormData = (): UpdatePasswordRequest => {
    return {
      password,
      newPassword,
      passwordConfirm: passwordConfirm,
    };
  };

  const submit = () => {
    if (isLoading) return;
    setErrors(null);
    const data = getFormData();
    mutate(data);
  };

  useEffect(() => {
    if (!isSuccess) return;
    reset();
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;

    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        setErrors({
          password: {
            message: 'Contraseña incorrecta',
            value: null,
          },
        });
      } else if (status === 400 && data.errors) {
        setErrors(data.errors);
      }
    }
  }, [isError, error]);

  return {
    password,
    newPassword,
    passwordConfirm,
    isLoading,
    errors,
    submit,
    reset,
    setPassword,
    setNewPassword,
    setPasswordConfirm,
  };
}
