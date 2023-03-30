import {
  ActionIcon,
  Button,
  Notification,
  Pagination,
  ScrollArea,
} from '@mantine/core';
import { IconFile, IconWriting, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import {
  boxPageSelector,
  showTransactionForm,
  unmountBox,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ITransaction } from 'src/types';
import { currencyFormat } from 'src/utils';
import TransactionTable from './TransactionTable';
import WaitingBox from './WaitingBox';

const BoxShow = () => {
  const transactionsByPage = 50;
  const {
    boxSelected,
    showingMainBox,
    loadingTransactions: loading,
    transactions: allTransactions,
    balance: globalBalance,
  } = useAppSelector(boxPageSelector);
  const [waitBox, setWaitBox] = useState(!(boxSelected || showingMainBox));
  const dispatch = useAppDispatch();

  const [paginationPages, setPaginationPages] = useState(0);
  const [activePage, setActivePage] = useState(12);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const addHandler = () => dispatch(showTransactionForm());

  const updatePagination = (items: number) => {
    const pages = Math.ceil(items / transactionsByPage);
    const page = activePage > pages ? pages || 1 : activePage;

    setPaginationPages(pages);
    setActivePage(page);
  };

  const filterTransactions = () => {
    const list = allTransactions.slice().reverse();

    updatePagination(list.length);
    setFilteredTransactions(list);
  };

  useEffect(() => {
    setWaitBox(loading || !(showingMainBox || boxSelected));
  }, [showingMainBox, boxSelected, loading]);

  useEffect(() => {
    filterTransactions();
  }, [allTransactions]);

  useEffect(() => {
    const startIndex = (activePage - 1) * transactionsByPage;
    const endIndex = startIndex + transactionsByPage;
    const list = filteredTransactions.slice(startIndex, endIndex);
    setTransactions(list);
  }, [filteredTransactions, activePage]);

  return (
    <>
      {waitBox ? (
        <WaitingBox loading={loading} />
      ) : (
        <div>
          <header className="relative rounded-t-md bg-gray-300 px-6 py-2 dark:bg-header">
            <h2 className="py-2 text-center text-xl font-bold tracking-wider">
              {showingMainBox ? 'Caja Global' : boxSelected?.name}
            </h2>

            <div className="absolute inset-0">
              <div className="flex h-full items-center justify-end pr-4">
                <ActionIcon
                  variant="transparent"
                  onClick={() => dispatch(unmountBox())}
                >
                  <IconX size={24} stroke={2} />
                </ActionIcon>
              </div>
            </div>
          </header>

          <ScrollArea className="relative h-[60vh] overflow-y-auto border border-y-0 border-x-gray-400 dark:border-x-header 3xl:h-[40rem]">
            {allTransactions.length > 0 ? (
              <TransactionTable transactions={transactions} />
            ) : (
              <div className="mx-auto flex h-[60vh] w-1/2 items-center justify-center">
                <Notification
                  title="! No hay Transacciones !"
                  withCloseButton={false}
                  icon={<IconFile size="1.2rem" />}
                  color="orange"
                >
                  Esta caja aun no tiene transacciones registradas
                </Notification>
              </div>
            )}
          </ScrollArea>

          <footer className="flex items-center justify-between rounded-b-md bg-gray-300 px-6 py-2 dark:bg-header">
            <div className="flex flex-col items-center gap-y-1 lg:flex-row lg:gap-x-2">
              <span className="text-xs lg:text-base">Saldo:</span>
              <span className="text-center text-xs font-bold lg:text-base">
                {currencyFormat(
                  showingMainBox ? globalBalance : boxSelected?.balance
                )}
              </span>
            </div>

            <div className="hidden lg:block">
              {paginationPages > 1 ? (
                <Pagination
                  total={paginationPages}
                  value={activePage}
                  onChange={setActivePage}
                />
              ) : null}
            </div>
            <Button leftIcon={<IconWriting />} onClick={addHandler}>
              Agregar Transacción
            </Button>
          </footer>
        </div>
      )}
    </>
  );
};

export default BoxShow;
