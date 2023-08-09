'use client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FormEvent } from 'react';
import { useCashboxForm } from '../_hooks/useCashboxForm';

export default function CashboxForm() {
  const { name, formId, isOpen, isLoading, errors, isCreate, close, updateName, submit } = useCashboxForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} closeOnOverlayClick={!isLoading} colorScheme="green">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">{isCreate ? 'Registrar Caja' : 'Actualizar Caja'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id={formId}>
            <FormControl isInvalid={Boolean(errors?.name)}>
              <FormLabel>Nombre de la caja</FormLabel>
              <Input
                placeholder="Escribe el nombre de la caja aquí"
                value={name}
                onChange={({ currentTarget }) => updateName(currentTarget.value)}
              />
              <FormErrorMessage>{errors?.name.message}</FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={isCreate ? 'green' : 'blue'}
            form={formId}
            type="submit"
            isLoading={isLoading}
            loadingText={isCreate ? 'Guardando...' : 'Actualizando...'}
          >
            {isCreate ? 'Guardar' : 'Actualizar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
