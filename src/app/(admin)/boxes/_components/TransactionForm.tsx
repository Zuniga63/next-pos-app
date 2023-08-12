'use client';

import { Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { TransactionPropertyEnum, useTransactionForm } from '../_hooks/useTransactionForm';
import CurrencyInput from '@/components/form/CurrencyInput';
import FormModal from '@/app/(admin)/boxes/_components/FormModal';

export default function TransactionForm() {
  const { form, isOpen, cashbox, errors, updateForm, updateAmount, submit, closeModal } = useTransactionForm();

  return (
    <FormModal
      title={form.isCreate ? 'Registrar Transacción' : 'Actualizar Transacción'}
      isOpen={isOpen}
      isLoading={form.isLoading}
      cashbox={cashbox}
      submitText={`${form.isCreate ? 'Guardar' : 'Actualizar'} ${form.isExpense ? 'Egreso' : 'Ingreso'}`}
      submitColorScheme={form.isCreate ? 'green' : 'blue'}
      submitLoadingText={form.isCreate ? 'Guardando...' : 'Actualizando...'}
      onClose={closeModal}
      onSubmit={submit}
    >
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
            onChange={({ currentTarget }) => updateForm(currentTarget.checked, TransactionPropertyEnum.IS_RIGHT_NOW)}
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
    </FormModal>
  );
}
