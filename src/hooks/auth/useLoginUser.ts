import { loginUser } from '@/services/auth.service';
import { saveCredentials } from '@/store/authStore';
import { SigninData } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

export function useLoginUser() {
  const toast = useToast({ position: 'top-left' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { isLoading, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user, access_token }) => {
      toast({
        title: `¡Bienvenido ${user?.name}!`,
        status: 'success',
      });

      if (user && access_token) {
        saveCredentials({ user, token: access_token });
        router.push('/dashboard');
      }
    },
    onError: error => {
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        if (axios.isAxiosError(error)) {
          const { response } = error;
          if (response?.status === 401) errorMessage = 'Usuario o contraseña incorrectos.';
        }

        errorMessage ||= error?.message;
      }

      toast({
        title: '¡Opps, algo salio mal!',
        description: errorMessage,
        status: 'error',
      });
    },
  });

  const updatePassword = (value: string) => {
    if (!value) return;
    setPassword(value);
  };

  const updateEmail = (value: string) => {
    if (!value) return;
    setEmail(value.trim());
  };

  const login = () => {
    const data: SigninData = { email, password };
    mutate(data);
  };

  return { email, password, isLoading, updateEmail, updatePassword, login };
}
