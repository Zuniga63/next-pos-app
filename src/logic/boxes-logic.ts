import { ICashboxFull, ITransaction } from '@/types';

export function addTransactionToMinorBox(cashbox: ICashboxFull | undefined, newTransaction: ITransaction) {
  if (!cashbox) return cashbox;
  const { transactions, balance, ...rest } = cashbox;
  const newBalance = balance + newTransaction.amount;
  newTransaction.balance = newBalance;
  return { ...rest, balance: newBalance, transactions: [...transactions, newTransaction] };
}
