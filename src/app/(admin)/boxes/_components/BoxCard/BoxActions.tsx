'use client';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { Button } from '@chakra-ui/react';
import { IconFolder, IconLockOpen } from '@tabler/icons-react';

type Props = {
  isOpen?: boolean;
  cashboxId: string;
};

export default function Actions({ isOpen, cashboxId }: Props) {
  const showOpenBoxForm = useCashboxesStore(state => state.mountBoxToOpen);
  const handleOpenBox = () => showOpenBoxForm(cashboxId);

  return (
    <footer className={`grid grid-cols-2 gap-x-2 bg-gray-200 px-4 py-2 ${!isOpen && 'bg-opacity-50'}`}>
      {isOpen ? (
        <Button
          colorScheme="blue"
          size="xs"
          className="col-span-2"
          leftIcon={<IconFolder size={14} stroke={1.5} />}
          onClick={handleOpenBox}
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
