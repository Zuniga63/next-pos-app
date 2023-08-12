'use client';

import { useCashboxesStore } from '@/store/cashboxesStore';
import { ReactNode, useEffect } from 'react';

type Props = {
  children?: ReactNode;
};

export default function BoxesContainer({ children }: Props) {
  const reset = useCashboxesStore(state => state.reset);
  useEffect(() => {
    return () => reset();
  }, []);
  return <div className="pt-6 text-dark lg:flex lg:gap-x-4 lg:px-8">{children}</div>;
}
