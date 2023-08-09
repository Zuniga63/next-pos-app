'use client';
import { useCashboxesStore } from '@/store/cashboxesStore';
import { ICashboxFull } from '@/types';
import { currencyFormat } from '@/utils';
import { IconButton } from '@chakra-ui/react';
import { IconX } from '@tabler/icons-react';

type Props = {
  cashbox?: ICashboxFull | null;
};

export default function BoxInfoHeader({ cashbox }: Props) {
  const unmountBox = useCashboxesStore(state => state.unmountBoxToShow);

  return (
    <header className="relative rounded-t-md bg-gray-300 px-6 py-2">
      <div className="mb-2 flex items-center gap-x-2">
        <div className="flex-grow">
          <h2 className="flex-grow text-lg font-bold tracking-wider">{cashbox?.name}</h2>
          <p className="text-sm">
            Base: <span className="font-bold">{currencyFormat(cashbox?.base)}</span>{' '}
          </p>
        </div>
        <IconButton
          colorScheme="blackAlpha"
          aria-label="Close box"
          size="xs"
          variant="ghost"
          icon={<IconX size={24} stroke={2} />}
          onClick={() => unmountBox()}
        />
      </div>
    </header>
  );
}
