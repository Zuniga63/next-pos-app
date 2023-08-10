'use client';
import { useGetMinorBoxes } from '@/hooks/react-query/boxes.hooks';
import BoxCard from '../BoxCard';
import { Skeleton } from '@chakra-ui/react';

export default function BoxListBody() {
  const { data, isLoading } = useGetMinorBoxes();

  return (
    <Skeleton isLoaded={!isLoading} className="h-[65vh] overflow-y-auto border-x border-gray-200 px-6 py-4">
      <div className="flex flex-col gap-y-4">{data?.map(cashbox => <BoxCard box={cashbox} key={cashbox.id} />)}</div>
    </Skeleton>
  );
}
