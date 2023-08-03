'use client';
import DeleteIconButton from '@/components/form/DeleteIconButton';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IconButton } from '@chakra-ui/react';
import { IconEdit } from '@tabler/icons-react';

type Props = {
  boxName: string;
  boxId: string;
  isOpen?: boolean;
};

export default function Header({ boxName, isOpen, boxId }: Props) {
  const showDeleteDialog = useCashboxesStore(state => state.showDeleteDialog);
  const showEditForm = useCashboxesStore(state => state.showCashboxForm);

  const handleDeleteAction = () => {
    showDeleteDialog(boxId);
  };

  const handleEditAction = () => {
    showEditForm(boxId);
  };

  return (
    <header className={`flex items-center gap-x-2 bg-gray-200 px-4 py-2`}>
      <div className="flex-grow">
        <div className="flex items-center gap-x-1">
          <h1 className="line-clamp-1 flex-grow font-display text-sm font-bold tracking-wider">{boxName}</h1>

          <DeleteIconButton
            ariaLabel="Delete box"
            size="xs"
            iconSize={16}
            iconStroke={1.5}
            display={!isOpen ? 'flex' : 'none'}
            onClick={handleDeleteAction}
          />

          <IconButton
            colorScheme="green"
            aria-label="Edit cashbox"
            size="xs"
            variant="ghost"
            icon={<IconEdit size={16} stroke={2} />}
            onClick={handleEditAction}
          />
        </div>
      </div>
    </header>
  );
}
