'use client';

import { useCreateMinorBox } from '@/hooks/boxes/useCreateMinorBox';
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

export default function CashboxForm() {
  const { name, formId, isOpen, isLoading, errors, close, updateName, submit } = useCreateMinorBox();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} closeOnOverlayClick={!isLoading}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">Nueva Caja</ModalHeader>
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
          <Button colorScheme="blue" form={formId} type="submit" isLoading={isLoading} loadingText="Guardando...">
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
