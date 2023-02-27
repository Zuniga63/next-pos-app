import React, { useMemo } from 'react';
import { ActionIcon, Loader, ScrollArea, Tooltip } from '@mantine/core';
import BoxListItem from './BoxListItem';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import MainBox from './MainBox';
import {
  boxPageSelector,
  fetchBoxes,
  showCreateForm,
} from 'src/features/BoxPage';
import normalizeBox from 'src/utils/normalizeBox';
import { IconBox, IconCirclePlus, IconRefresh } from '@tabler/icons';
import { currencyFormat } from 'src/utils';

const BoxList = () => {
  const {
    boxes,
    mainBox,
    fetchLoading: loading,
    openBoxIsSuccess,
    storeTransactionIsSuccess,
    closeBoxIsSuccess,
  } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();
  const sum = useMemo(
    () => boxes.reduce((result, currentBox) => result + currentBox.balance, 0),
    [
      boxes.length,
      openBoxIsSuccess,
      storeTransactionIsSuccess,
      closeBoxIsSuccess,
    ]
  );
  const sumWithoutBase = useMemo(
    () =>
      boxes.reduce(
        (result, currentBox) => result + currentBox.balance - currentBox.base,
        0
      ),
    [
      boxes.length,
      openBoxIsSuccess,
      storeTransactionIsSuccess,
      closeBoxIsSuccess,
    ]
  );
  return (
    <div>
      <header className="rounded-t-md border-x border-t border-gray-400 bg-gray-300 px-4 py-2 dark:border-header dark:bg-header">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cajas</h2>
          <div className="flex gap-x-2">
            <Tooltip label="Actualizar" withArrow>
              <ActionIcon
                onClick={() => dispatch(fetchBoxes())}
                loading={loading}
                color="blue"
              >
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
      {loading ? (
        <div className="h-96 3xl:h-[70vh]">
          <div className="flex h-full flex-col items-center justify-center gap-y-2">
            <Loader />
            <p className="animate-pulse text-sm">Recuperando cajas...</p>
          </div>
        </div>
      ) : (
        <ScrollArea className="h-96 overflow-y-auto border-x border-gray-400 px-4 py-4 dark:border-header 3xl:h-[70vh]">
          <ul>
            {boxes.map(box => (
              <BoxListItem box={normalizeBox(box)} key={box.id} />
            ))}

            {mainBox && <MainBox mainBox={mainBox} />}
          </ul>
        </ScrollArea>
      )}
      <footer className="flex min-h-[40px] items-center justify-between gap-x-2 rounded-b-md border-x border-b border-gray-400 bg-gray-300 px-4 py-2 dark:border-dark dark:bg-header">
        <Tooltip label="Cajas" withArrow>
          <div className="flex items-center gap-x-1">
            <IconBox size={24} />
            <span className="text-sm font-bold">{boxes.length}</span>
          </div>
        </Tooltip>

        <Tooltip label="Saldo sin la base">
          <p className="text-sm font-bold text-emerald-500">
            {currencyFormat(sumWithoutBase)}
          </p>
        </Tooltip>

        <Tooltip label="Saldo con la base">
          <p className="text-sm font-bold text-green-500">
            {currencyFormat(sum)}
          </p>
        </Tooltip>
      </footer>
    </div>
  );
};

export default BoxList;
