'use client';
import { FormEvent } from 'react';
import EmailInput from '../form/EmailInput';
import PasswordInput from '../form/PasswordInput';
import { Button } from '@chakra-ui/react';
import { IconLogin } from '@tabler/icons-react';
import { useLoginUser } from '@/hooks/auth/useLoginUser';

export default function LoginForm() {
  const { email, password, isLoading, updateEmail, updatePassword, login } = useLoginUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-y-4 xl:mb-14 xl:gap-y-6">
      <EmailInput value={email} onChange={updateEmail} label="Correo Electronico" isRequired />
      <PasswordInput
        value={password}
        onChange={updatePassword}
        label="Contraseña"
        isRequired
        placeholder="Contraseña"
      />

      <footer className="mx-auto flex w-full items-center xl:w-10/12">
        <Button
          colorScheme="blue"
          w="full"
          type="submit"
          isLoading={isLoading}
          loadingText="Iniciando Sesión..."
          rightIcon={<IconLogin size={20} className="rotate-180 transform" />}
        >
          Iniciar Sesión
        </Button>
      </footer>
    </form>
  );
}
