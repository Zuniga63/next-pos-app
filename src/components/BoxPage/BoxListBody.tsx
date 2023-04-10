import { ScrollArea } from '@mantine/core';
import React from 'react';
import { boxPageSelector } from 'src/features/BoxPage';
import { useAppSelector } from 'src/store/hooks';
import BoxListLoading from './BoxListLoading';

interface Props {
  children: React.ReactNode;
}
const BoxListBody = ({ children }: Props) => {
  const { fetchLoading: loading, firstFetchLoading: firstLoading } =
    useAppSelector(boxPageSelector);

  return loading && firstLoading ? (
    <BoxListLoading />
  ) : (
    <ScrollArea className="h-[65vh] overflow-y-auto border-x border-gray-400 px-6 py-4 dark:border-header">
      <div className="flex flex-col gap-y-4">{children}</div>
    </ScrollArea>
  );
};

export default BoxListBody;
