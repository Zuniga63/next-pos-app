import React, { useEffect, useState } from 'react';
import { IBox } from '@/types';
import { IconAlertTriangle, IconDeviceFloppy, IconEditCircle, IconLock, IconLockOpen } from '@tabler/icons-react';
import { currencyFormat } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ActionIcon, Tooltip } from '@mantine/core';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
import { fetchBoxes, removeBox, mountBoxToOpen, mountBoxToClose, boxPageSelector } from '@/features/BoxPage';
import dayjs from 'dayjs';
import CashBoxCardHeader from './CashBoxCardHeader';

interface Props {
  box: IBox;
}

const CashBoxCard: React.FC<Props> = ({ box }) => {
  const [openFromNow, setOpenFromNow] = useState('');
  const [closedFronNow, setClosedFromNow] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [neverUsed, setNeverUsed] = useState(true);
  const [createIsSameUpdate, setCreateIsSameUpdate] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(Boolean(box.openBox));
  const { boxSelected } = useAppSelector(boxPageSelector);

  const dispatch = useAppDispatch();

  const refreshState = () => {
    if (box.openBox) {
      setOpenFromNow(dayjs(box.openBox).fromNow());
    } else if (box.closed) {
      setClosedFromNow(dayjs(box.closed).fromNow());
    }
    setCreatedAt(dayjs(box.createdAt).fromNow());
    setUpdatedAt(dayjs(box.updatedAt).fromNow());
    setNeverUsed(!box.openBox && !box.closed);
    setCreateIsSameUpdate(dayjs(box.createdAt).isSame(box.updatedAt));
  };

  const deleteBox = async () => {
    const url = `/cashboxes/minors/${box.id}`;
    const message = /*html */ `La caja "<strong>${box.name}</strong>" será eliminada permanentemente y esta acción no puede revertirse.`;

    const result = await Swal.fire({
      title: '<strong>¿Desea eliminar la caja?',
      html: message,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ¡Eliminala!',
      backdrop: true,
      icon: 'warning',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const result = { ok: false, message: '' };
        try {
          const res = await axios.delete(url);
          result.ok = true;
          result.message = `La caja <strong>${res.data.name}</strong> fue eliminada con éxito.`;
          dispatch(removeBox(box.id));
        } catch (error) {
          if (error instanceof AxiosError) {
            const { response } = error;
            if (response?.status === 404) dispatch(fetchBoxes());
            result.message = response?.data.message;
          } else {
            console.log(error);
          }
        }

        return result;
      },
    });

    if (result.isConfirmed && result.value) {
      const { ok, message } = result.value;
      if (ok) {
        Swal.fire({
          title: '<strong>¡Caja Eliminada!</strong>',
          html: message,
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: '¡Ops, algo salio mal!',
          text: message,
          icon: 'error',
        });
      }
    }
  };

  useEffect(() => {
    refreshState();
    let intervalId: NodeJS.Timer;
    const timeUnit = 'minutes';
    const timeDiffs: number[] = [];
    let dateRefreshRate: number | undefined;
    const now = dayjs();

    timeDiffs.push(now.diff(box.createdAt, timeUnit), now.diff(box.updatedAt, timeUnit));

    if (box.openBox) {
      timeDiffs.push(now.diff(box.openBox, timeUnit));
      setIsOpen(true);
    } else if (box.closed) {
      timeDiffs.push(now.diff(box.closed, timeUnit));
      setIsOpen(false);
    }

    if (timeDiffs.length > 0) {
      const minDiff = Math.min(...timeDiffs);
      if (minDiff < 60) {
        dateRefreshRate = 1000 * 60; // each minute
      } else if (minDiff >= 60 && minDiff < 60 * 24) {
        dateRefreshRate = 1000 * 60 * 60; // each hour
      }

      intervalId = setInterval(refreshState, dateRefreshRate);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [box.openBox, box.closed, box.createdAt, box.updatedAt]);

  useEffect(() => {
    setIsSelected(Boolean(boxSelected && boxSelected.id === box.id));
  }, [boxSelected]);

  return (
    <div className="overflow-hidden rounded-b rounded-t-lg border shadow-sm dark:border-header dark:shadow-header">
      <CashBoxCardHeader
        boxId={box.id}
        boxName={box.name}
        cashierName={box.cashier ? box.cashier.name : box.cashierName}
        isOpen={isOpen}
        isSelected={isSelected}
        onDelete={deleteBox}
      />
      {/* Body */}
      <div className="bg-gradient-to-b from-gray-200 to-indigo-300 px-4 py-2 dark:bg-none">
        {box.openBox ? (
          <div className="flex justify-between text-xs text-gray-dark dark:text-gray-400">
            <p>
              Base: <span className="font-bold">{currencyFormat(box.base)}</span>
            </p>
            <div className="flex items-center gap-x-2 ">
              <IconLockOpen size={18} />
              <span>{openFromNow}</span>
            </div>
          </div>
        ) : null}

        {box.closed ? (
          <div className="flex flex-col items-center gap-y-2 py-2 text-gray-dark dark:text-gray-400">
            <IconLock size={24} stroke={2} />
            <p className="text-xs">Cerrada {closedFronNow}</p>
          </div>
        ) : null}

        {neverUsed ? (
          <div className="flex flex-col items-center gap-y-1 py-2 text-gray-dark dark:text-gray-400">
            <IconAlertTriangle size={24} stroke={2} />
            <p className="text-xs tracking-widest">¡Caja nunca usada!</p>
          </div>
        ) : null}

        {box.openBox && (
          <Tooltip
            label={
              <div className="flex flex-col items-center">
                <h4 className="text-sm">Saldo sin la base</h4>
                <p className="text-xs font-bold tracking-widest">{currencyFormat(box.balance - box.base)}</p>
              </div>
            }
            withArrow
            hidden={!box.base}
          >
            <p className="py-2 text-center text-xl font-bold tracking-wider">{currencyFormat(box.balance)}</p>
          </Tooltip>
        )}

        <div className="mt-2 flex justify-between text-xs text-gray-dark dark:text-gray-400">
          <div className="flex items-center gap-x-2">
            <IconDeviceFloppy size={18} />
            <span>{createdAt}</span>
          </div>
          {!createIsSameUpdate && (
            <div className="flex items-center gap-x-2">
              <IconEditCircle size={18} />
              <span>{updatedAt}</span>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="flex justify-center bg-indigo-400 px-4 py-1 dark:bg-header">
        <div className="flex gap-x-1">
          {isOpen ? (
            <Tooltip label="Cerrar caja" color="orange" withArrow>
              <ActionIcon
                color="orange"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  e.stopPropagation();
                  dispatch(mountBoxToClose(box.id));
                }}
              >
                <IconLock size={14} stroke={2} />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip label="Abrir caja" color="green" withArrow>
              <ActionIcon
                color="green"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  e.stopPropagation();
                  dispatch(mountBoxToOpen(box.id));
                }}
              >
                <IconLockOpen size={14} stroke={2} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      </footer>
    </div>
  );
};

export default CashBoxCard;
