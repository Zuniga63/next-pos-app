import { ActionIcon, NumberInput, NumberInputHandlers } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { currencyFormat } from '@/utils';

interface Props {
  denomination: string;
  value: number;
  index: number;
  onChange(index: number, count: number): void;
}

const CashBoxCountableItem: FC<Props> = ({ denomination, value, index, onChange }) => {
  const [count, setCount] = useState<number | ''>(0);
  const handlers = useRef<NumberInputHandlers>();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(value * (count || 0));
  }, [count]);

  return (
    <tr>
      <td className="text-right">{denomination}</td>
      <td>
        <div className="flex justify-center">
          <div className="flex w-32 items-center gap-x-2">
            <ActionIcon size={30} variant="default" onClick={() => handlers.current?.decrement()}>
              <IconMinus stroke={2} size={14} />
            </ActionIcon>
            <NumberInput
              size="xs"
              className="flex-grow"
              hideControls
              handlersRef={handlers}
              value={count}
              onChange={value => {
                setCount(value);
                onChange(index, value || 0);
              }}
              onFocus={({ currentTarget }) => currentTarget.select()}
            />
            <ActionIcon size={30} variant="default" onClick={() => handlers.current?.increment()}>
              <IconPlus stroke={2} size={14} />
            </ActionIcon>
          </div>
        </div>
      </td>
      <td className="text-right">{currencyFormat(amount)}</td>
    </tr>
  );
};

export default CashBoxCountableItem;
