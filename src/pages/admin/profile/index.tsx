import { Button, PasswordInput } from '@mantine/core';
import { IconEyeCheck, IconEyeOff, IconLock } from '@tabler/icons-react';
import axios, { AxiosError } from 'axios';
import Layout from 'src/components/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/store/hooks';
import { logout } from 'src/features/Auth';
import { IValidationErrors } from 'src/types';

const ProfilePage: NextPage = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const reset = () => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrors(null);
      await axios.patch('/auth/local/profile/change-password', {
        password,
        newPassword,
        passwordConfirm,
      });
      toast.success('Contraseña actualizada');
      reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          toast.error('Contraseña incorrecta');
          setPassword('');
        } else if (status === 400 && data.errors) {
          setErrors(data.errors);
        } else if (status === 404) {
          dispatch(logout());
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        }
      } else {
        toast.error(
          'Error inesperado, consulte la consola para mas información'
        );
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Perfil de Usuario">
      <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* INFO */}
          <div className="flex justify-between md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium">Actualizar Contraseña</h3>
              <p className="mt-1 text-sm text-gray-400">
                Aseguresé de que su cuenta esté usando una contraseña larga y
                aleatoria para mantenerse seguro.
              </p>
            </div>
          </div>
          {/* FORM */}
          <form className="mt-5 md:col-span-2 md:mt-0" onSubmit={onSubmit}>
            <div className="bg-header px-4 py-5 shadow shadow-header sm:rounded-tl-md sm:rounded-tr-md">
              <div className="grid grid-cols-6">
                <PasswordInput
                  icon={<IconLock size={16} />}
                  label="Contraseña actual"
                  required
                  className="col-span-6 md:col-span-4"
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? (
                      <IconEyeOff size={size} />
                    ) : (
                      <IconEyeCheck size={size} />
                    )
                  }
                  value={password}
                  onChange={({ currentTarget }) =>
                    setPassword(currentTarget.value)
                  }
                  disabled={loading}
                  autoComplete="current-password"
                />
                <PasswordInput
                  icon={<IconLock size={16} />}
                  label="Nueva contraseña"
                  required
                  className="col-span-6 md:col-span-4"
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? (
                      <IconEyeOff size={size} />
                    ) : (
                      <IconEyeCheck size={size} />
                    )
                  }
                  value={newPassword}
                  onChange={({ currentTarget }) =>
                    setNewPassword(currentTarget.value)
                  }
                  disabled={loading}
                  error={errors?.newPassword?.message}
                  autoComplete="new-password"
                />
                <PasswordInput
                  icon={<IconLock size={16} />}
                  label="Confirmar contraseña"
                  required
                  className="col-span-6 md:col-span-4"
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? (
                      <IconEyeOff size={size} />
                    ) : (
                      <IconEyeCheck size={size} />
                    )
                  }
                  value={passwordConfirm}
                  onChange={({ currentTarget }) =>
                    setConfirmPassword(currentTarget.value)
                  }
                  disabled={loading}
                  error={errors?.passwordConfirm?.message}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <footer className="sm: flex items-center justify-end rounded-br-md bg-gray-dark px-4 py-3 text-right shadow shadow-gray-800 sm:rounded-bl-md sm:px-6">
              <Button type="submit" loading={loading}>
                Actualizar Contraseña
              </Button>
            </footer>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
