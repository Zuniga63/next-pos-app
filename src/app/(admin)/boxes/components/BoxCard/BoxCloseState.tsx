'use client';
import { IconAlertTriangle, IconLock } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
  isOpen?: boolean;
  closed?: string;
};

export default function CloseState({ closed, isOpen }: Props) {
  const [closedFronNow, setClosedFromNow] = useState(closed ? dayjs(closed).fromNow() : null);

  const updateRelativeTime = (date: string) => {
    const relativeTime = dayjs(date).fromNow();
    setClosedFromNow(relativeTime);
  };

  useEffect(() => {
    if (isOpen || !closed || !dayjs(closed).isValid()) return;
    updateRelativeTime(closed);

    const timeDiff = Math.abs(dayjs().diff(closed, 'minute'));
    const timer = timeDiff > 60 ? 60 * 60 : 60; //* in seconds

    const intervalId = setInterval(() => {
      updateRelativeTime(closed);
    }, timer * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [closed, isOpen]);

  if (isOpen) return null;

  return (
    <div className="flex items-center justify-center gap-x-2">
      {closed ? <IconLock size={16} /> : <IconAlertTriangle size={16} />}
      <p className="text-center text-xs italic">{closed ? `Cerrada ${closedFronNow}` : 'Caja nunca usada'} </p>
    </div>
  );
}
