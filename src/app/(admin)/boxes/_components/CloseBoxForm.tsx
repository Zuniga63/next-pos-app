'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { FormEvent } from 'react';
import { currencyFormat } from '@/utils';
import { useCloseBoxForm } from '../_hooks/useCloseBoxForm';

export default function CloseBoxForm() {
  const { box, isOpen, cash, isLoading, formId, errors, close, submit, updateCash } = useCloseBoxForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} closeOnOverlayClick={!isLoading} colorScheme="green">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">Cerrar Caja</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="mx-auto w-10/12">
            <h2 className="text-center text-sm italic">
              Caja: <span className="font-bold">{box?.name}</span>
            </h2>
            <p className="text-center text-sm italic">
              Saldo: <span className="font-bold">{currencyFormat(box?.balance)}</span>{' '}
            </p>
          </div>
          <form onSubmit={handleSubmit} id={formId}>
            <FormControl isInvalid={Boolean(errors?.name)}>
              <FormLabel>Efectivo</FormLabel>
              <NumberInput min={0} value={cash} onChange={updateCash}>
                <NumberInputField placeholder="$100.000" textAlign="right" />
              </NumberInput>
              <FormErrorMessage>{errors?.cash.message}</FormErrorMessage>
              <FormHelperText textAlign="right">{currencyFormat(cash)}</FormHelperText>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" form={formId} type="submit" isLoading={isLoading} loadingText="Abriendo caja...">
            Cerrar Caja
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
