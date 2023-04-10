import { ActionIcon, Tooltip } from '@mantine/core';
import {
  IconAward,
  IconFolder,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react';
import { mountBox } from 'src/features/BoxPage';
import { useAppDispatch } from 'src/store/hooks';

type Props = {
  boxId: string;
  boxName: string;
  cashierName?: string;
  isOpen: boolean;
  isSelected: boolean;
  onDelete(): void;
};

function CashBoxCardHeader({
  boxId,
  boxName,
  cashierName,
  isOpen,
  isSelected,
  onDelete,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <header className="flex items-center gap-x-2 bg-gray-300 px-4 py-2 dark:bg-header">
      <div className="flex-grow">
        <div className="flex items-center gap-x-2">
          {/* BOX IS SELECTED */}
          <div className="flex-shrink-0">
            <IconStarFilled
              size={14}
              className={
                isSelected
                  ? 'text-amber-500 transition-colors'
                  : 'text-neutral-500 transition-colors'
              }
            />
          </div>

          {/* BOX INFO */}
          <div className="flex-grow">
            <h1 className="text-center text-sm font-bold tracking-wider line-clamp-1">
              {boxName}
            </h1>
            {isOpen && (
              <div className="flex items-center justify-center gap-x-2 text-gray-dark dark:text-gray-400">
                <IconAward size={18} />
                <p className="text-xs">{cashierName}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE BOX */}

      <div className="flex-shrink-0">
        {isOpen ? (
          <Tooltip label="Ver Transacciones" color="blue" withArrow>
            <ActionIcon color="blue" onClick={() => dispatch(mountBox(boxId))}>
              <IconFolder size={14} stroke={2} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Eliminar caja" color="red" withArrow>
            <ActionIcon color="red" onClick={onDelete}>
              <IconTrash size={14} stroke={2} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
    </header>
  );
}

export default CashBoxCardHeader;
