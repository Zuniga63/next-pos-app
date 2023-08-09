'use client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useDeleteDialog } from '../_hooks/useDeleteDialog';

export default function DeleteDialog() {
  const { isOpen, cancelRef, box, isLoading, close, deleteBox } = useDeleteDialog();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={close} closeOnOverlayClick={!isLoading}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" fontFamily="heading">
            Eliminar Caja
          </AlertDialogHeader>

          <AlertDialogBody>
            ¿Estas seguro de eliminar la caja <strong>{box?.name}</strong>? Esta acción no es reversible.
          </AlertDialogBody>

          <AlertDialogFooter>
            <div className="flex w-full justify-between">
              <Button ref={cancelRef} onClick={close} isDisabled={isLoading}>
                Cancelar
              </Button>
              <Button colorScheme="red" isLoading={isLoading} loadingText="Eliminando..." onClick={deleteBox}>
                Eliminar
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
