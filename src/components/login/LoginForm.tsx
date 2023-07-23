'use client';
import { FormEvent } from 'react';
import EmailInput from '../form/EmailInput';
import PasswordInput from '../form/PasswordInput';
import { Button } from '@chakra-ui/react';
import { IconLogin } from '@tabler/icons-react';
import { useLoginUser } from '@/hooks/react-query/auth.hooks';

export default function LoginForm() {
  const { email, password, isLoading, updateEmail, updatePassword, login } = useLoginUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <EmailInput value={email} onChange={updateEmail} label="Correo Electronico" isRequired />
      <PasswordInput
        value={password}
        onChange={updatePassword}
        label="Contraseña"
        isRequired
        placeholder="Contraseña"
      />

      <footer className="flex items-center justify-end">
        <Button
          colorScheme="blue"
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
