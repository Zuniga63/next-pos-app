'use client';
import FormSection from '../form/FormSection';
import FormSectionBody from '../form/FormSectionBody';
import FormSectionActions from '../form/FormSectionActions';
import PasswordInput from '../form/PasswordInput';
import { Button } from '@chakra-ui/react';
import { useUpdateUserPassword } from '@/hooks/auth/useUpdateUserPassword';

export default function UpdatePasswordForm() {
  const {
    password,
    newPassword,
    passwordConfirm,
    isLoading,
    errors,
    submit,
    reset,
    setNewPassword,
    setPassword,
    setPasswordConfirm,
  } = useUpdateUserPassword();

  return (
    <FormSection
      title="Actualizar contraseña"
      description="Aseguresé de que su cuenta esté usando una contraseña larga y aleatoria para mantenerse seguro."
      onSubmit={submit}
    >
      <FormSectionBody hasActions>
        <PasswordInput
          isRequired
          label="Contraseña actual"
          className="col-span-6 md:col-span-4"
          name="password"
          placeholder="Escribe la actual contraseña aquí"
          value={password}
          onChange={setPassword}
          error={errors?.password?.message}
        />

        <PasswordInput
          isRequired
          label="Nueva contraseña"
          className="col-span-6 mt-4 md:col-span-4"
          name="new-password"
          value={newPassword}
          onChange={setNewPassword}
          error={errors?.newPassword?.message}
        />

        <PasswordInput
          isRequired
          label="Confirmar contraseña"
          className="col-span-6 mt-4 md:col-span-4"
          name="confirm-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          error={errors?.passwordConfirm?.message}
        />
      </FormSectionBody>

      <FormSectionActions>
        <Button colorScheme="blackAlpha" variant="link" onClick={reset} isDisabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" colorScheme="blackAlpha" isLoading={isLoading} loadingText="Actualizando contraseña...">
          Actualizar contraseña
        </Button>
      </FormSectionActions>
    </FormSection>
  );
}
