import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBox, IconLockOpen, IconLock, IconWorldDollar } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { authSelector } from '@/features/Auth';
import { boxPageSelector, mountGlobalTransactions } from '@/features/BoxPage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { currencyFormat } from '@/utils';

const BoxListFooter = () => {
  const [openBoxes, setOpenBoxes] = useState(0);
  const [closeBoxes, setCloseBoxes] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceWithoutBase, setBalanceWithoutBase] = useState(0);
  const [balanceIsEquals, setBalanceIsEquals] = useState(false);

  const { boxes, changeIsSuccess, balance: globalBalance } = useAppSelector(boxPageSelector);
  const { isAdmin } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (changeIsSuccess) {
      let open = 0;
      let close = 0;
      let currentBalance = 0;
      let currentBalanceWithoutBase = 0;
      boxes.forEach(box => {
        if (box.openBox) {
          open += 1;
          currentBalance += box.balance;
          currentBalanceWithoutBase += box.balance - box.base;
        } else {
          close += 1;
        }
      });

      setOpenBoxes(open);
      setCloseBoxes(close);
      setBalance(currentBalance);
      setBalanceWithoutBase(currentBalanceWithoutBase);
      setBalanceIsEquals(currentBalance === currentBalanceWithoutBase);
    }
  }, [changeIsSuccess]);

  return (
    <footer className="min-h-[40px] rounded-b-md border-x border-b border-gray-400 bg-gray-300 px-4 py-2 dark:border-dark dark:bg-header">
      <div className="flex items-center justify-between">
        {/* BOXES */}
        <div className="flex flex-col items-center gap-y-2">
          {/* ALL BOXES */}
          <Tooltip label="Cajas">
            <div className="flex gap-x-2 text-gray-dark dark:text-light">
              <IconBox size={16} />
              <span className="text-xs font-bold">{boxes.length}</span>
            </div>
          </Tooltip>

          {/* BOXES DETAILS */}
          <div className="flex gap-x-2">
            <Tooltip label="Cajas Activas">
              <div className="flex gap-x-2 text-emerald-500">
                <IconLockOpen size={16} />
                <span className="text-xs font-bold">{openBoxes}</span>
              </div>
            </Tooltip>

            <Tooltip label="Cajas Cerradas">
              <div className="flex gap-x-2 text-red-500">
                <IconLock size={16} />
                <span className="text-xs font-bold">{closeBoxes}</span>
              </div>
            </Tooltip>
          </div>
        </div>

        {isAdmin ? (
          <Tooltip
            label={
              <div className="flex flex-col items-center">
                <p className="text-xs">Saldo Global</p>
                <p className="text-sm font-bold tracking-widest">{currencyFormat(globalBalance)}</p>
              </div>
            }
            color="violet"
            withArrow
            arrowSize={12}
          >
            <ActionIcon color="grape" size={40} onClick={() => dispatch(mountGlobalTransactions())}>
              <IconWorldDollar />
            </ActionIcon>
          </Tooltip>
        ) : null}

        {/* BALANCES */}
        <div className="flex flex-col items-end justify-center">
          <Tooltip label="Saldo">
            <p className="text-sm font-bold text-emerald-500">{currencyFormat(balance)}</p>
          </Tooltip>

          {!balanceIsEquals ? (
            <Tooltip label="Saldo sin bases">
              <p className="text-sm font-bold text-green-500">{currencyFormat(balanceWithoutBase)}</p>
            </Tooltip>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default BoxListFooter;
