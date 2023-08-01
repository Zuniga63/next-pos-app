'use client';
import { useGetMinorBoxes } from '@/hooks/boxes/useGetMinorBoxes';
import { currencyFormat } from '@/utils';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function BoxListBody({ children }: Props) {
  const { data } = useGetMinorBoxes();
  return (
    <div className="h-[65vh] overflow-y-auto border-x border-gray-200 px-6 py-4">
      <div className="flex flex-col gap-y-4">
        {data?.map(cashbox => (
          <div key={cashbox.id}>
            <h3>{cashbox.name}</h3>
            <p>{cashbox.openBox}</p>
            <p>{currencyFormat(cashbox.balance)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
