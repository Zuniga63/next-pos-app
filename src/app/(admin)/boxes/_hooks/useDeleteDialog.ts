import { useDeleteMinorBox, useGetMinorBoxes } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IBox } from '@/types';
import { useEffect, useState, useRef } from 'react';

export function useDeleteDialog() {
  const boxId = useCashboxesStore(state => state.cashboxIdToDelete);
  const closeDialog = useCashboxesStore(state => state.closeDeleteDialog);

  const [box, setBox] = useState<IBox | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  const { mutate, isLoading, isSuccess } = useDeleteMinorBox();

  const { data: boxes } = useGetMinorBoxes();

  const close = () => {
    setIsOpen(false);
    setBox(null);
    closeDialog();
  };

  const deleteBox = () => {
    if (isLoading || !boxId) return;
    mutate({ id: boxId });
  };

  useEffect(() => {
    if (!boxes || !boxId) {
      close();
      return;
    }

    const boxData = boxes.find(item => item.id === boxId);
    if (!boxData) {
      close();
      return;
    }

    setBox(boxData);
    setIsOpen(true);
  }, [boxId]);

  useEffect(() => {
    if (!isSuccess) return;
    close();
  }, [isSuccess]);

  return { isOpen, cancelRef, box, isLoading, close, deleteBox };
}
