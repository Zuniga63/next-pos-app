'use client';
import { Button } from '@chakra-ui/react';

export default function BoxListFooter() {
  return (
    <footer className="min-h-[40px] rounded-b-md border-x border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-dark dark:bg-header">
      <Button>Ver todas las transacciones</Button>
    </footer>
  );
}
