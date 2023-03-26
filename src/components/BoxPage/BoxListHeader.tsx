import { ActionIcon, Tooltip } from '@mantine/core';
import { IconCirclePlus, IconRefresh } from '@tabler/icons-react';
import React from 'react';
import { authSelector } from 'src/features/Auth';
import {
  boxPageSelector,
  fetchBoxes,
  getGlobalBalance,
  showCreateForm,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const BoxListHeader = () => {
  const { fetchLoading } = useAppSelector(boxPageSelector);
  const { isAdmin } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const refresh = () => {
    dispatch(fetchBoxes());
    if (isAdmin) {
      dispatch(getGlobalBalance());
    }
  };

  return (
    <header className="rounded-t-md border-x border-t border-gray-400 bg-gray-300 px-4 py-2 dark:border-header dark:bg-header">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-wider">Cajas</h2>
        <div className="flex gap-x-2">
          <Tooltip label="Actualizar" withArrow>
            <ActionIcon onClick={refresh} loading={fetchLoading} color="blue">
              <IconRefresh size={18} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Agregar caja" withArrow>
            <ActionIcon
              onClick={() => dispatch(showCreateForm())}
              color="green"
            >
              <IconCirclePlus size={24} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default BoxListHeader;
