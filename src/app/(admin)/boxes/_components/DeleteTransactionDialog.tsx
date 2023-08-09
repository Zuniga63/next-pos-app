'use client';

import { useDeleteTransaction } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { currencyFormat } from '@/utils';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export default function DeleteTransactionDialog() {
  const transaction = useCashboxesStore(state => state.transactionToDelete);
  const isGlobal = useCashboxesStore(state => state.isGlobal);
  const boxId = useCashboxesStore(state => state.cashboxIdToShow);
  const closeDialog = useCashboxesStore(state => state.unmountTransactionToDelete);

  const toast = useToast({ position: 'top-left' });
  const cancelRef = useRef(null);

  const { data: transactionDeleted, isLoading, isSuccess, mutate } = useDeleteTransaction();

  const deleteTransaction = () => {
    if (!transaction) return;
    mutate({ id: transaction.id, isGlobal, boxId });
  };

  useEffect(() => {
    if (!isSuccess) return;

    toast({
      title: '¡Transacción Elminiada!',
      description: (
        <>
          <div className="rounded border border-gray-200 p-2">
            <p className="text-sm font-bold ">Descripción:</p>
            <p className="text-xs italic text-opacity-90">{transactionDeleted?.description}</p>
          </div>

          <div className="mt-2 rounded border border-gray-200 p-2">
            <p className="text-sm">
              Importe:{' '}
              <span className="text-xs font-bold tracking-widest">{currencyFormat(transactionDeleted?.amount)}</span>
            </p>
          </div>
        </>
      ),
      status: 'success',
    });
    closeDialog();
  }, [isSuccess]);

  return (
    <AlertDialog
      isOpen={Boolean(transaction)}
      leastDestructiveRef={cancelRef}
      onClose={closeDialog}
      closeOnOverlayClick={!isLoading}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" fontFamily="heading">
            Eliminar Transacción
          </AlertDialogHeader>

          <AlertDialogBody>
            {transaction?.cashbox && typeof transaction.cashbox !== 'string' && (
              <div className="mb-2 rounded border border-gray-200 p-2">
                <p className="text-sm font-bold text-dark">Caja:</p>
                <p className="text-xs italic text-dark text-opacity-90">
                  {(transaction?.cashbox as { name: string }).name}
                </p>
              </div>
            )}

            <div className="rounded border border-gray-200 p-2">
              <p className="text-sm font-bold text-dark">Descripción:</p>
              <p className="text-xs italic text-dark text-opacity-90">{transaction?.description}</p>
            </div>

            <div className="mt-2 rounded border border-gray-200 p-2">
              <p className="text-sm">
                Importe:{' '}
                <span className="text-xs font-bold tracking-widest">{currencyFormat(transaction?.amount)}</span>{' '}
              </p>
            </div>
          </AlertDialogBody>

          <AlertDialogFooter>
            <div className="flex w-full justify-between">
              <Button ref={cancelRef} onClick={closeDialog} isDisabled={isLoading}>
                Cancelar
              </Button>
              <Button colorScheme="red" isLoading={isLoading} loadingText="Eliminando..." onClick={deleteTransaction}>
                Eliminar
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
