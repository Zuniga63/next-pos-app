import { useGetMinorBox } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export function useMinorBoxInfo() {
  const boxId = useCashboxesStore(state => state.cashboxIdToShow);
  const unmountBox = useCashboxesStore(state => state.unmountBoxToShow);
  const notifyEnd = useCashboxesStore(state => state.notifyLoadingInfoEnd);
  const toast = useToast({ position: 'top-left' });

  const [search, setSearch] = useState<string | undefined>('');

  const { data: cashbox, isLoading, isError, isFetching } = useGetMinorBox({ id: boxId });

  useEffect(() => {
    if (!isError) return;
    toast({
      title: '¡Ops, algo salio mal!',
      description: 'No se pudo recuperar la información de la caja, por favor intentelo nuevamente mas tarde.',
      status: 'error',
    });
    unmountBox();
  }, [isError]);

  useEffect(() => {
    if (isFetching) return;
    notifyEnd();
  }, [isFetching]);

  return {
    boxSelected: Boolean(boxId),
    search,
    setSearch,
    cashbox,
    isLoading,
  };
}
