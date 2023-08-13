'use client';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { currencyFormat } from '@/utils';
import { Checkbox } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  boxId: string;
  balance: number;
  isOpen?: boolean;
};

export default function BoxBalance({ boxId, balance, isOpen }: Props) {
  const boxesIds = useCashboxesStore(state => state.sumBoxesId);
  const addToSum = useCashboxesStore(state => state.addBoxToSum);
  const removeToSum = useCashboxesStore(state => state.removeBoxToSum);
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    if (isChecked) removeToSum(boxId);
    else addToSum(boxId);
  };

  useEffect(() => {
    const exist = boxesIds.includes(boxId);
    setIsChecked(exist);
  }, [boxesIds]);

  useEffect(() => {
    if (!isOpen && isChecked) removeToSum(boxId);
  }, [isOpen]);

  if (!isOpen) return;
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox isChecked={isChecked} onChange={handleChecked} />
      <p className="flex-grow text-center text-xl font-bold tracking-wider">{currencyFormat(balance)}</p>
    </div>
  );
}
