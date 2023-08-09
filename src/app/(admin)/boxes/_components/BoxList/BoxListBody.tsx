'use client';
import { useGetMinorBoxes } from '@/hooks/react-query/boxes.hooks';
import { ReactNode } from 'react';
import BoxCard from '../BoxCard';

type Props = {
  children?: ReactNode;
};

export default function BoxListBody({ children }: Props) {
  const { data } = useGetMinorBoxes();
  return (
    <div className="h-[65vh] overflow-y-auto border-x border-gray-200 px-6 py-4">
      <div className="flex flex-col gap-y-4">{data?.map(cashbox => <BoxCard box={cashbox} key={cashbox.id} />)}</div>
    </div>
  );
}
