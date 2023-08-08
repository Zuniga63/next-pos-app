'use client';

import { Button, Skeleton } from '@chakra-ui/react';
import { IconArrowsExchange, IconCirclePlus } from '@tabler/icons-react';
import { currencyFormat } from '@/utils';
import TransactionTable from '../TransactionTable';
import BoxInfoHeader from './BoxInfoHeader';
import Pagination from '@/components/Pagination';
import { useTransactions } from '../../_hooks/useTransactions';
import SearchInput from '../SearchInput';
import { useMinorBoxInfo } from '../../_hooks/useMinorBoxInfo';
import { useCashboxesStore } from '@/store/cashboxesStore';

export default function MinorBoxInfo() {
  const { boxSelected, search, cashbox, isLoading, setSearch } = useMinorBoxInfo();
  const showTransactionForm = useCashboxesStore(state => state.showTransactionForm);
  const showCashTransferForm = useCashboxesStore(state => state.showCashTransferForm);

  const { transactions, currentPage, pageCount, nextPage, prevPage, goToPage } = useTransactions({
    search,
    allTransactions: cashbox?.transactions,
  });

  if (!boxSelected) return null;

  return (
    <Skeleton isLoaded={!isLoading} fadeDuration={1} className="mt-4 flex-grow lg:mt-0">
      <BoxInfoHeader cashbox={cashbox} />

      <div className="border border-y-0 border-x-gray-200">
        <div className="flex gap-x-2 p-2">
          <SearchInput value={search} onChange={setSearch} />

          <Button
            colorScheme="blue"
            size="xs"
            flexShrink={0}
            leftIcon={<IconCirclePlus size={14} />}
            onClick={() => showTransactionForm()}
          >
            Registrar Transacción
          </Button>

          <Button
            colorScheme="orange"
            leftIcon={<IconArrowsExchange size={14} />}
            size="xs"
            flexShrink={0}
            onClick={() => showCashTransferForm()}
          >
            Realizar Transferencia
          </Button>
        </div>

        <TransactionTable transactions={transactions} />
      </div>

      <footer className="flex flex-col items-center justify-between gap-y-2 rounded-b-md bg-gray-300 px-6 py-2 dark:bg-header lg:flex-row">
        <div className="flex flex-col items-center gap-y-1 lg:flex-row lg:gap-x-2">
          <span className="text-xs lg:text-base">Saldo:</span>
          <span className="text-center text-xs font-bold lg:text-base">{currencyFormat(cashbox?.balance)}</span>
        </div>
        {pageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            pages={pageCount}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            onPageClick={goToPage}
          />
        )}
      </footer>
    </Skeleton>
  );
}
