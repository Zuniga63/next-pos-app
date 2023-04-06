import {
  ActionIcon,
  Button,
  Loader,
  Notification,
  Pagination,
  ScrollArea,
  TextInput,
} from '@mantine/core';
import {
  IconArrowsExchange,
  IconCirclePlus,
  IconFile,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  boxPageSelector,
  showCashTransferForm,
  showTransactionForm,
  unmountBox,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ITransaction } from 'src/types';
import { currencyFormat, normalizeText } from 'src/utils';
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

  const [search, setSearch] = useState<string | undefined>('');
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceSearch = useRef<undefined | NodeJS.Timeout>();

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
    let list: ITransaction[] = [];

    if (search) {
      const text = normalizeText(search);
      list = allTransactions.filter(item =>
        normalizeText(item.description).includes(text)
      );
    } else {
      list = allTransactions.slice();
    }

    updatePagination(list.length);
    setFilteredTransactions(list.reverse());
  };

  function updateSearch(value: string) {
    if (debounceSearch.current) {
      console.log('Limpiando el intervalo');
      clearTimeout(debounceSearch.current);
    }

    setSearchLoading(true);
    debounceSearch.current = setTimeout(() => {
      setSearchLoading(false);
      setSearch(value);
    }, 500);
  }

  useEffect(() => {
    setWaitBox(loading || !(showingMainBox || boxSelected));
  }, [showingMainBox, boxSelected, loading]);

  useEffect(() => {
    filterTransactions();
  }, [allTransactions, search]);

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

            <div className="pr-8">
              <TextInput
                size="xs"
                placeholder="Buscar transacción"
                onFocus={({ currentTarget }) => currentTarget.select()}
                icon={
                  searchLoading ? (
                    <Loader size={14} variant="dots" />
                  ) : (
                    <IconSearch size={14} stroke={1.5} />
                  )
                }
                onChange={({ currentTarget }) =>
                  updateSearch(currentTarget.value)
                }
              />
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

          <footer className="flex flex-col items-center justify-between gap-y-2 rounded-b-md bg-gray-300 px-6 py-2 dark:bg-header lg:flex-row">
            <div className="flex flex-col items-center gap-y-1 lg:flex-row lg:gap-x-2">
              <span className="text-xs lg:text-base">Saldo:</span>
              <span className="text-center text-xs font-bold lg:text-base">
                {currencyFormat(
                  showingMainBox ? globalBalance : boxSelected?.balance
                )}
              </span>
            </div>

            <div>
              {paginationPages > 1 ? (
                <Pagination
                  total={paginationPages}
                  value={activePage}
                  onChange={setActivePage}
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-x-2 gap-y-2 lg:flex-row">
              <Button
                leftIcon={<IconCirclePlus size="1.5rem" stroke={1.5} />}
                onClick={addHandler}
                size="xs"
              >
                Agregar Transacción
              </Button>

              {!showingMainBox && Boolean(boxSelected) ? (
                <Button
                  leftIcon={<IconArrowsExchange size="1.5rem" stroke={1.5} />}
                  onClick={() => dispatch(showCashTransferForm())}
                  color="orange"
                  size="xs"
                >
                  Transferir Fondos
                </Button>
              ) : null}
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default BoxShow;
