'use client';
import DeleteIconButton from '@/components/form/DeleteIconButton';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { IconEdit, IconFolderOpen, IconLock } from '@tabler/icons-react';
import { useMemo } from 'react';

type Props = {
  boxName: string;
  boxId: string;
  isOpen?: boolean;
};

export default function Header({ boxName, isOpen, boxId }: Props) {
  const showDeleteDialog = useCashboxesStore(state => state.mountBoxToDelete);
  const showEditForm = useCashboxesStore(state => state.showCashboxForm);
  const showCloseBoxForm = useCashboxesStore(state => state.mountBoxToClose);
  const boxIdSelected = useCashboxesStore(state => state.cashboxIdToShow);

  const isSelected = useMemo(() => {
    return boxId === boxIdSelected;
  }, [boxIdSelected]);

  const handleDeleteAction = () => {
    showDeleteDialog(boxId);
  };

  const handleEditAction = () => {
    showEditForm(boxId);
  };

  const handleCloseAction = () => {
    showCloseBoxForm(boxId);
  };

  return (
    <header className={`flex items-center gap-x-2 bg-gray-200 px-4 py-2`}>
      <div className="flex-grow">
        <div className="flex items-center gap-x-1">
          {isSelected && <IconFolderOpen size={16} className="text-yellow-500" />}

          <h1 className="line-clamp-1 flex-grow font-display text-xs font-bold tracking-wider">{boxName}</h1>

          <DeleteIconButton
            ariaLabel="Eliminar caja"
            size="xs"
            iconSize={16}
            iconStroke={1.5}
            display={!isOpen ? 'flex' : 'none'}
            onClick={handleDeleteAction}
          />

          <Tooltip label="Cerrar caja" hasArrow bg="blue" rounded="lg">
            <IconButton
              colorScheme="blue"
              aria-label="Close box"
              size="xs"
              variant="ghost"
              icon={<IconLock size={16} stroke={2} />}
              display={isOpen ? 'flex' : 'none'}
              onClick={handleCloseAction}
            />
          </Tooltip>

          <Tooltip label="Editar caja" hasArrow bg="green" rounded="lg">
            <IconButton
              colorScheme="green"
              aria-label="Edit cashbox"
              size="xs"
              variant="ghost"
              icon={<IconEdit size={16} stroke={2} />}
              onClick={handleEditAction}
            />
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
