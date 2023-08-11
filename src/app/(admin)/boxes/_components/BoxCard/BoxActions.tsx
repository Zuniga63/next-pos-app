'use client';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { Button } from '@chakra-ui/react';
import { IconFolder, IconLockOpen } from '@tabler/icons-react';

type Props = {
  isOpen?: boolean;
  cashboxId: string;
};

export default function Actions({ isOpen, cashboxId }: Props) {
  const loadigInfo = useCashboxesStore(state => state.loadingInfo);
  const cashboxMount = useCashboxesStore(state => state.cashboxIdToShow);
  const mountBoxToOpen = useCashboxesStore(state => state.mountBoxToOpen);
  const handleShowBoxInfo = () => mountBoxToShow(cashboxId);

  const mountBoxToShow = useCashboxesStore(state => state.mountBoxToShow);
  const handleOpenBox = () => mountBoxToOpen(cashboxId);

  const isLoading = cashboxId === loadigInfo;

  return (
    <footer className={`grid grid-cols-2 gap-x-2 bg-gray-200 px-4 py-2 ${!isOpen && 'bg-opacity-50'}`}>
      {isOpen ? (
        <Button
          colorScheme="blue"
          size="xs"
          className="col-span-2"
          leftIcon={<IconFolder size={14} stroke={1.5} />}
          onClick={handleShowBoxInfo}
          isLoading={isLoading}
          loadingText={<span className="animate-pulse">Cargando info...</span>}
          isDisabled={cashboxId === cashboxMount}
        >
          Ver Transacciones
        </Button>
      ) : (
        <Button
          colorScheme="green"
          size="xs"
          className="col-span-2"
          leftIcon={<IconLockOpen size={14} stroke={1.5} />}
          onClick={handleOpenBox}
        >
          Abrir Caja
        </Button>
      )}
    </footer>
  );
}
