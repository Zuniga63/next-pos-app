'use client';

import { currencyFormat } from '@/utils';
import {
  Button,
  Checkbox,
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
  Textarea,
} from '@chakra-ui/react';
import { IconArrowBigRightLineFilled, IconDeviceFloppy } from '@tabler/icons-react';
import { FormEvent } from 'react';
import { TransactionPropertyEnum, useTransactionForm } from '../_hooks/useTransactionForm';
import CurrencyInput from '@/components/form/CurrencyInput';

export default function TransactionForm() {
  const { form, isOpen, cashbox, errors, updateForm, updateAmount, submit, closeModal } = useTransactionForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} closeOnOverlayClick={!form.isLoading} colorScheme="green">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">
          {form.isCreate ? 'Registrar Transacción' : 'Actualizar Transacción'}
        </ModalHeader>
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
            {/* TRANSACTION DATE */}
            <FormControl isInvalid={Boolean(errors?.transactionDate)}>
              <FormLabel>Fecha de la transacción</FormLabel>
              <div className="flex flex-col gap-y-2">
                <div className="gap-x-2 md:mb-2 md:grid md:grid-cols-5">
                  <Input
                    type="date"
                    className="mb-2 md:col-span-3 md:mb-0"
                    size="sm"
                    isDisabled={form.isRigthNow}
                    value={form.date}
                    name={TransactionPropertyEnum.DATE}
                    onChange={({ currentTarget }) => {
                      updateForm(currentTarget.value, TransactionPropertyEnum.DATE);
                    }}
                  />
                  <Input
                    type="time"
                    className="mb-2 md:col-span-2 md:mb-0"
                    size="sm"
                    isDisabled={form.isRigthNow}
                    name={TransactionPropertyEnum.TIME}
                    value={form.time}
                    onChange={({ currentTarget }) => {
                      updateForm(currentTarget.value, TransactionPropertyEnum.TIME);
                    }}
                  />
                </div>
                <FormErrorMessage>{errors?.transactionDate.message}</FormErrorMessage>
                <Checkbox
                  isChecked={form.isRigthNow}
                  name={TransactionPropertyEnum.IS_RIGHT_NOW}
                  onChange={({ currentTarget }) =>
                    updateForm(currentTarget.checked, TransactionPropertyEnum.IS_RIGHT_NOW)
                  }
                >
                  En este momento
                </Checkbox>
              </div>
            </FormControl>

            {/* DESCRIPTION */}
            <FormControl isInvalid={Boolean(errors?.description)} isRequired mt="2">
              <FormLabel>Descripción</FormLabel>
              <Textarea
                value={form.description}
                onChange={({ currentTarget }) => updateForm(currentTarget.value, TransactionPropertyEnum.DESCRIPTION)}
                size="sm"
                resize="none"
                placeholder="Describe la transacción aquí"
                name={TransactionPropertyEnum.DESCRIPTION}
                rows={2}
              />
              <FormErrorMessage>{errors?.description.message}</FormErrorMessage>
            </FormControl>

            {/* IMPORTE */}
            <CurrencyInput
              label="Importe"
              isRequired
              placeholder="$ 100.000"
              value={form.amount}
              onChange={updateAmount}
              textAlign="right"
              errorMessage={errors?.amount.message}
            />

            <Checkbox
              isChecked={form.isExpense}
              onChange={({ currentTarget }) => updateForm(currentTarget.checked, TransactionPropertyEnum.IS_EXPENSE)}
              name={TransactionPropertyEnum.IS_EXPENSE}
            >
              Es un egreso
            </Checkbox>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={form.isCreate ? 'green' : 'blue'}
            form={form.id}
            type="submit"
            isLoading={form.isLoading}
            loadingText={form.isCreate ? 'Guardando...' : 'Actualizando...'}
            leftIcon={<IconDeviceFloppy size={16} stroke={1.5} />}
          >
            {form.isCreate ? 'Guardar ' : 'Actualizar '}
            {form.isExpense ? 'Egreso' : 'Ingreso'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
