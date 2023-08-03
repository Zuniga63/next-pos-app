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
import { useOpenBoxForm } from '../_hooks/useOpenBoxForm';
import { FormEvent } from 'react';
import { currencyFormat } from '@/utils';

export default function OpenBoxForm() {
  const { box, isOpen, base, isLoading, formId, errors, close, submit, updateBase } = useOpenBoxForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} closeOnOverlayClick={!isLoading} colorScheme="green">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">Abrir Caja</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="mx-auto w-10/12">
            <h2 className="text-center text-sm italic">
              Caja: <span className="font-bold">{box?.name}</span>
            </h2>
          </div>
          <form onSubmit={handleSubmit} id={formId}>
            <FormControl isInvalid={Boolean(errors?.name)}>
              <FormLabel>Base</FormLabel>
              <NumberInput min={0} value={base} onChange={updateBase}>
                <NumberInputField placeholder="$100.000" textAlign="right" />
              </NumberInput>
              <FormErrorMessage>{errors?.name.message}</FormErrorMessage>
              <FormHelperText textAlign="right">{currencyFormat(base)}</FormHelperText>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" form={formId} type="submit" isLoading={isLoading} loadingText="Abriendo caja...">
            Abrir Caja
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
