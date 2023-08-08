'use client';

import { currencyFormat } from '@/utils';
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
  Select,
  Textarea,
} from '@chakra-ui/react';
import { IconArrowBigRightLineFilled, IconDeviceFloppy } from '@tabler/icons-react';
import { FormEvent } from 'react';
import { useCashTransferForm } from '../_hooks/useCashTransferForm';

export default function CashTransferForm() {
  const {
    form,
    isOpen,
    cashbox,
    errors,
    addresseeBoxes,
    closeModal,
    setDescription,
    updateAmount,
    submit,
    setAddressBox,
  } = useCashTransferForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} closeOnOverlayClick={!form.isLoading} colorScheme="green">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">Registrar Transferencia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {cashbox && (
            <div className="mb-4 flex items-center justify-between rounded border border-gray-200 px-4 py-1 text-dark shadow">
              <p className="text-sm">
                Caja: <span className="font-bold">{cashbox.name}</span>
              </p>
              <IconArrowBigRightLineFilled size="1rem" stroke={1.5} />
              <p className="text-sm">
                Saldo: <span className="italic">{currencyFormat(cashbox.balance)}</span>{' '}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} id={form.id}>
            {/* ADDREESSES BOX*/}
            <FormControl isInvalid={Boolean(errors?.addresseeBox)} isRequired mt="2">
              <FormLabel>Caja destino</FormLabel>
              <Select
                placeholder="Selecciona una caja"
                size="xs"
                value={form.addresseeBox}
                onChange={({ currentTarget }) => {
                  setAddressBox(currentTarget.value);
                }}
              >
                {addresseeBoxes.map(box => (
                  <option value={box.id} key={box.id}>
                    {box.name} - {currencyFormat(box.balance)}{' '}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.addresseeBox.message}</FormErrorMessage>
            </FormControl>

            {/* DESCRIPTION */}
            <FormControl isInvalid={Boolean(errors?.description)} mt="2">
              <FormLabel>Descripción</FormLabel>
              <Textarea
                value={form.description}
                onChange={({ currentTarget }) => setDescription(currentTarget.value)}
                size="xs"
                resize="none"
                placeholder="Describe la transacción aquí"
              />
              <FormErrorMessage>{errors?.description.message}</FormErrorMessage>
            </FormControl>

            {/* IMPORTE */}
            <FormControl isInvalid={Boolean(errors?.amount)} isRequired mt="2">
              <FormLabel>Importe</FormLabel>
              <NumberInput min={0} value={form.amount} onChange={updateAmount}>
                <NumberInputField placeholder="$100.000" textAlign="right" />
              </NumberInput>
              <FormErrorMessage>{errors?.amount.message}</FormErrorMessage>
              <FormHelperText textAlign="right">{currencyFormat(form.amount)}</FormHelperText>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="orange"
            form={form.id}
            type="submit"
            isLoading={form.isLoading}
            loadingText="Guardando..."
            leftIcon={<IconDeviceFloppy size={16} stroke={1.5} />}
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
