import { Button, Modal, TextInput } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  boxPageSelector,
  hideCreateForm,
  storeBox,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IValidationErrors } from 'src/types';

const CreateForm = () => {
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const {
    createFormOpened: opened,
    storeBoxLoading: loading,
    storeBoxIsSuccess: isSuccess,
    storeBoxError: error,
  } = useAppSelector(boxPageSelector);

  const dispatch = useAppDispatch();

  //---------------------------------------------------------------------------
  // EFFECTS
  //---------------------------------------------------------------------------
  useEffect(() => {
    if (name && name.trim().length) setEnabled(true);
    else setEnabled(false);
  }, [name]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`¡La caja ${name} fue creada con éxito!`);
      setName('');
      dispatch(hideCreateForm());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const { data, status } = error;
      if ((status === 422 || status === 400) && data.errors) {
        setErrors(data.errors);
      } else if (status === 401) {
        toast.error(data.errorMessage);
      } else {
        console.log(error);
      }
    }
  }, [error]);

  //---------------------------------------------------------------------------
  // HANDLERS
  //---------------------------------------------------------------------------
  const closeHandler = () => {
    if (!loading) {
      setName('');
      setErrors(null);
      dispatch(hideCreateForm());
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name: name.trim() };
    dispatch(storeBox(data));
  };

  return (
    <Modal opened={opened} title={<p>Nueva Caja</p>} onClose={closeHandler}>
      <form onSubmit={submitHandler}>
        <div className="mb-2">
          <TextInput
            label="Nombre"
            placeholder="Escribe el nombre de la caja aquí"
            value={name}
            onChange={({ target }) => setName(target.value)}
            disabled={loading}
            error={errors?.name.message}
          />
        </div>
        <footer className="flex items-center justify-end">
          <Button
            leftIcon={<IconDeviceFloppy />}
            loading={loading}
            type="submit"
            disabled={!enabled}
            size="xs"
          >
            Guardar
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default CreateForm;
