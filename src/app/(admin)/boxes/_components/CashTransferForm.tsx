'use client';

import { currencyFormat } from '@/utils';
import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useCashTransferForm } from '../_hooks/useCashTransferForm';
import CurrencyInput from '@/components/form/CurrencyInput';
import FormModal from '@/app/(admin)/boxes/_components/FormModal';

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

  return (
    <FormModal
      title="Registrar Transferencia"
      isOpen={isOpen}
      isLoading={form.isLoading}
      cashbox={cashbox}
      submitText="Realizar Transferencia"
      submitColorScheme="orange"
      submitLoadingText="Transfiriendo..."
      onClose={closeModal}
      onSubmit={submit}
    >
      {/* ADDREESSES BOX*/}
      <FormControl isInvalid={Boolean(errors?.addresseeBox)} isRequired mt="2">
        <FormLabel>Caja destino</FormLabel>
        <Select
          placeholder="Selecciona una caja"
          value={form.addresseeBox}
          onChange={value => setAddressBox(value)}
          isClearable
          options={addresseeBoxes.map(box => ({
            label: `${box.name} (${currencyFormat(box.balance)})`,
            value: box.id,
          }))}
        />

        <FormErrorMessage>{errors?.addresseeBox.message}</FormErrorMessage>
      </FormControl>

      {/* DESCRIPTION */}
      <FormControl isInvalid={Boolean(errors?.description)} mt="2" mb="2">
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={form.description}
          onChange={({ currentTarget }) => setDescription(currentTarget.value)}
          size="sm"
          resize="none"
          placeholder="Describe la transacción aquí"
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
    </FormModal>
  );
}
