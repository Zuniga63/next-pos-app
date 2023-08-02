import { currencyFormat } from '@/utils';

type Props = {
  balance: number;
  isOpen?: boolean;
};

export default function BoxBalance({ balance, isOpen }: Props) {
  if (!isOpen) return;
  return <p className="text-center text-xl font-bold tracking-wider">{currencyFormat(balance)}</p>;
}
