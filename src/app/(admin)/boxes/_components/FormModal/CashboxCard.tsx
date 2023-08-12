import { IBox } from '@/types';
import { currencyFormat } from '@/utils';
import { IconArrowBigRightLineFilled } from '@tabler/icons-react';

export default function CashboxCard({ cashbox }: { cashbox?: IBox | null }) {
  if (!cashbox) return null;

  return (
    <div className="mb-4 flex items-center justify-between rounded border border-gray-200 px-4 py-1 text-dark shadow">
      <p className="text-sm">
        Caja: <span className="font-bold">{cashbox.name}</span>
      </p>
      <IconArrowBigRightLineFilled size="1rem" stroke={1.5} />
      <p className="text-sm">
        Saldo: <span className="italic">{currencyFormat(cashbox.balance)}</span>
      </p>
    </div>
  );
}
