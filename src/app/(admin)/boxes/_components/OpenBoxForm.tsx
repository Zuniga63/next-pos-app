'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useOpenBoxForm } from '../_hooks/useOpenBoxForm';
import { FormEvent } from 'react';
import CurrencyInput from '@/components/form/CurrencyInput';

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
            <CurrencyInput
              label="Base"
              placeholder="$100.000"
              value={base}
              onChange={updateBase}
              errorMessage={errors?.base.message}
              textAlign="right"
            />
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
