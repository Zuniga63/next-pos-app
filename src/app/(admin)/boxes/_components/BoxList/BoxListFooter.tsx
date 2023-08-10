'use client';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { Button } from '@chakra-ui/react';

export default function BoxListFooter() {
  const showGlobalBox = useCashboxesStore(state => state.showGlobalBox);
  return (
    <footer className="min-h-[40px] rounded-b-md border-x border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-dark dark:bg-header">
      <Button colorScheme="purple" width="full" onClick={showGlobalBox}>
        Ver caja global
      </Button>
    </footer>
  );
}
