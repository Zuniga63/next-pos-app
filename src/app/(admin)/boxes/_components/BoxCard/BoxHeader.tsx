'use client';
import DeleteIconButton from '@/components/form/DeleteIconButton';
import { useCashboxesStore } from '@/store/cashboxesStore';

type Props = {
  boxName: string;
  boxId: string;
  isOpen?: boolean;
};

export default function Header({ boxName, isOpen, boxId }: Props) {
  const showDeleteDialog = useCashboxesStore(state => state.showDeleteDialog);

  const handleDeleteAction = () => {
    showDeleteDialog(boxId);
  };

  return (
    <header className={`flex items-center gap-x-2 bg-gray-200 px-4 py-2`}>
      <div className="flex-grow">
        <div className="flex items-center gap-x-2">
          {/* BOX INFO */}
          <div className="flex-grow">
            <h1 className="line-clamp-1 text-center font-display text-sm font-bold tracking-wider">{boxName}</h1>
          </div>
          <DeleteIconButton
            ariaLabel="Delete box"
            size="xs"
            iconSize={16}
            iconStroke={1.5}
            display={!isOpen ? 'flex' : 'none'}
            onClick={handleDeleteAction}
          />
        </div>
      </div>
    </header>
  );
}
