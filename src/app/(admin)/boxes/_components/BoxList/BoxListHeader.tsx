'use client';
import NewButtonIcon from '@/components/form/NewButtonIcon';
import RefreshButtonIcon from '@/components/form/RefreshButtonIcon';
import { useCashboxesStore } from '@/store/cashboxesStore';
import React from 'react';

export default function BoxListHeader() {
  const showCashboxForm = useCashboxesStore(state => state.showCashboxForm);
  return (
    <header className="rounded-t-md border-x border-t border-gray-200 bg-gray-50 px-4 py-2">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-wider">Cajas</h2>
        <div className="flex gap-x-2">
          <RefreshButtonIcon />
          <NewButtonIcon onClick={showCashboxForm} />
        </div>
      </div>
    </header>
  );
}
