'use client';

import { useGetMinorBoxes } from '@/hooks/react-query/boxes.hooks';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { IBox } from '@/types';
import { currencyFormat } from '@/utils';
import { useEffect, useMemo, useState } from 'react';

export default function BoxSum() {
  const boxesToSum = useCashboxesStore(state => state.sumBoxesId);
  const isGlobal = useCashboxesStore(state => state.isGlobal);
  const showingBox = useCashboxesStore(state => state.cashboxIdToShow);
  const { data: allBoxes } = useGetMinorBoxes();
  const [selectedBoxes, setSelectedBoxes] = useState<IBox[]>([]);
  const [show, setShow] = useState(false);

  const balanceSum = useMemo(() => {
    return selectedBoxes.reduce((sum, { balance }) => sum + balance, 0);
  }, [selectedBoxes]);

  useEffect(() => {
    const result: IBox[] = [];
    boxesToSum.forEach(id => {
      const box = allBoxes?.find(box => box.id === id);
      if (box) result.push(box);
    });
    setSelectedBoxes(result);
  }, [allBoxes, boxesToSum]);

  useEffect(() => {
    if (isGlobal || showingBox || balanceSum <= 0) setShow(false);
    else setShow(true);
  }, [balanceSum, boxesToSum, isGlobal, showingBox]);

  if (!show) return null;

  return (
    <div>
      <div className="shadow">
        <h2 className="rounded-t border border-header bg-header p-2 font-display text-light">Sumatoria de Saldos</h2>
        <div className="flex flex-col gap-y-2 border-x border-header bg-defaul-body px-4 py-2 text-light">
          {selectedBoxes.map(box => (
            <p key={box.id} className="text-right text-sm">
              {box.name}: <span className="font-bold tracking-widest">{currencyFormat(box.balance)}</span>
            </p>
          ))}
        </div>
        <div className="rounded-b bg-header p-2 text-right font-bold text-light">{currencyFormat(balanceSum)}</div>
      </div>
    </div>
  );
}
