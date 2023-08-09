'use client';

import { useCashboxesStore } from '@/store/cashboxesStore';
import { ITransaction } from '@/types';
import { currencyFormat } from '@/utils';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { IconArrowsExchange, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

type Props = {
  isGlobalBox?: boolean;
  transaction: ITransaction;
};

export default function TransactionRow({ transaction, isGlobalBox = false }: Props) {
  const transactionDate = dayjs(transaction.transactionDate);
  const isExpensive = transaction.amount < 0;
  const balanceGTZero = transaction.balance >= 0;
  const isTransfer = Boolean(transaction.isTransfer);
  const otherBox =
    isGlobalBox && transaction.cashbox && typeof transaction.cashbox !== 'string' ? transaction.cashbox : null;

  const mountToDelete = useCashboxesStore(state => state.mountTransactionToDelte);
  const handleDeleteAction = () => mountToDelete(transaction);

  return (
    <Tr key={transaction.id}>
      <Td padding={2}>
        <div className="whitespace-nowrap text-center">
          <p className="hidden text-sm lg:block">{transactionDate.format('DD/MM/YY hh:mm a')}</p>
          <p className="text-sm lg:hidden">{transactionDate.format('DD/MM/YY')}</p>
          <p className="hidden text-xs lg:block">{transactionDate.fromNow()}</p>
        </div>
      </Td>
      <Td padding={2} whiteSpace="normal">
        <div>
          <div className="flex items-center gap-x-2">
            {transaction.isTransfer ? <IconArrowsExchange size="1.5rem" className="text-amber-500" stroke={2} /> : null}
            <p className="text-xs lg:text-base">{transaction.description}</p>
          </div>
          {otherBox ? (
            <p className="text-xs">
              <span>Pertence a: </span>
              <span className="font-bold">{otherBox.name}</span>
            </p>
          ) : null}
        </div>
      </Td>
      <Td className={`text-right ${isExpensive ? 'text-red-500' : 'text-emerald-500'}`} padding={2}>
        {currencyFormat(transaction.amount)}
      </Td>
      <Td
        className={`hidden  text-right text-sm font-bold lg:table-cell 
        ${balanceGTZero ? 'text-emerald-500' : 'text-red-500'}`}
        padding={2}
      >
        {currencyFormat(transaction.balance)}
      </Td>
      <Td padding={2}>
        {!isTransfer && (
          <IconButton
            aria-label="Delete transaction"
            colorScheme="red"
            variant="ghost"
            size="xs"
            onClick={handleDeleteAction}
            icon={<IconTrash size={14} stroke={1.5} />}
          />
        )}
      </Td>
    </Tr>
  );
}
