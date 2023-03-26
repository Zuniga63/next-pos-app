import React, { useEffect, useState } from 'react';
import { IBox } from 'src/types';
import {
  IconAlertTriangle,
  IconAward,
  IconChevronDown,
  IconChevronUp,
  IconDeviceFloppy,
  IconEditCircle,
  IconFolder,
  IconLock,
  IconLockOpen,
  IconTrash,
} from '@tabler/icons-react';
import { currencyFormat } from 'src/utils';
import { useAppDispatch } from 'src/store/hooks';
import { ActionIcon, Collapse, Divider, Tooltip } from '@mantine/core';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
import {
  fetchBoxes,
  removeBox,
  mountBoxToOpen,
  mountBoxToClose,
  mountBox,
} from 'src/features/BoxPage';
import dayjs from 'dayjs';

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
  const [opened, setOpened] = useState(false);

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

  const toggleHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpened(current => !current);
  };

  useEffect(() => {
    refreshState();
    let intervalId: NodeJS.Timer;
    const timeUnit = 'minutes';
    const timeDiffs: number[] = [];
    let dateRefreshRate: number | undefined;
    const now = dayjs();

    timeDiffs.push(
      now.diff(box.createdAt, timeUnit),
      now.diff(box.updatedAt, timeUnit)
    );

    if (box.openBox) {
      timeDiffs.push(now.diff(box.openBox, timeUnit));
    } else if (box.closed) {
      timeDiffs.push(now.diff(box.closed, timeUnit));
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

  return (
    <div className="mb-4">
      <div className="overflow-hidden rounded-lg border shadow-sm dark:border-header dark:shadow-gray-500">
        <header
          className="flex cursor-pointer items-center justify-between bg-gray-300 px-4 py-2 dark:bg-header"
          onClick={() => setOpened(current => !current)}
        >
          {/* TOGGLE BUTTOM */}
          <Tooltip label={opened ? 'Contraer' : 'Expandir'}>
            <ActionIcon size="xs" onClick={toggleHandler}>
              {opened ? (
                <IconChevronDown size={16} />
              ) : (
                <IconChevronUp size={16} />
              )}
            </ActionIcon>
          </Tooltip>

          {/* BOX INFO */}
          <div className="flex-grow">
            <h1 className="text-center text-sm font-bold tracking-wider line-clamp-1">
              {box.name}
            </h1>
            {box.openBox ? (
              <div className="flex items-center justify-center gap-x-2 text-gray-dark dark:text-gray-400">
                <IconAward size={18} />
                <p className="text-xs">
                  {box.cashier ? box.cashier.name : box.cashierName}
                </p>
              </div>
            ) : null}
          </div>

          {/* BOX ACTIONS */}
          <div className="flex-shrink-0">
            <div className="flex gap-x-1">
              {box.openBox ? (
                <>
                  {/* CERRAR CAJA */}
                  <Tooltip label="Cerrar caja" color="orange" withArrow>
                    <ActionIcon
                      color="orange"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        e.stopPropagation();
                        dispatch(mountBoxToClose(box.id));
                      }}
                    >
                      <IconLock size={14} stroke={2} />
                    </ActionIcon>
                  </Tooltip>

                  {/* VER TRANSACCIONES */}
                  <Tooltip label="Ver Transacciones" color="blue" withArrow>
                    <ActionIcon
                      color="blue"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        e.stopPropagation();
                        dispatch(mountBox(box.id));
                      }}
                    >
                      <IconFolder size={14} stroke={2} />
                    </ActionIcon>
                  </Tooltip>
                </>
              ) : (
                <>
                  {/* OPEN BOX */}
                  <Tooltip label="Abrir caja" color="green" withArrow>
                    <ActionIcon
                      color="green"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        e.stopPropagation();
                        dispatch(mountBoxToOpen(box.id));
                      }}
                    >
                      <IconLockOpen size={14} stroke={2} />
                    </ActionIcon>
                  </Tooltip>

                  {/* VER TRANSACCIONES */}
                  <Tooltip label="Eliminar caja" color="red" withArrow>
                    <ActionIcon
                      color="red"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        e.stopPropagation();
                        deleteBox();
                      }}
                    >
                      <IconTrash size={14} stroke={2} />
                    </ActionIcon>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        </header>
        {/* Body */}
        <Collapse in={opened}>
          <div className="bg-gradient-to-b from-gray-200 to-indigo-300 px-4 py-2 dark:bg-none">
            {box.openBox ? (
              <div className="flex justify-between text-xs text-gray-dark dark:text-gray-400">
                <p>
                  Base:{' '}
                  <span className="font-bold">{currencyFormat(box.base)}</span>
                </p>
                <div className="flex items-center gap-x-2 ">
                  <IconLockOpen size={18} />
                  <span>{openFromNow}</span>
                </div>
              </div>
            ) : null}

            {box.closed ? (
              <div className="flex flex-col items-center gap-y-3 py-4 text-gray-dark dark:text-gray-400">
                <IconLock size={30} stroke={2} />
                <p className="text-xs">Cerrada {closedFronNow}</p>
              </div>
            ) : null}

            {neverUsed ? (
              <div className="flex flex-col items-center gap-y-3 py-4 text-gray-dark dark:text-gray-400">
                <IconAlertTriangle size={30} stroke={2} />
                <p className="text-xs tracking-widest">¡Caja nunca usada!</p>
              </div>
            ) : null}

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
        </Collapse>
        {!opened && box.openBox ? <Divider /> : null}

        {/* Footer */}
        {box.openBox ? (
          <footer className="bg-indigo-400 px-4 py-2 dark:bg-header">
            <Tooltip
              label={
                <div className="flex flex-col items-center">
                  <h4 className="text-sm">Saldo sin la base</h4>
                  <p className="text-xs font-bold tracking-widest">
                    {currencyFormat(box.balance - box.base)}
                  </p>
                </div>
              }
              withArrow
              hidden={!box.base}
            >
              <p className="text-center text-xl font-bold tracking-wider">
                {currencyFormat(box.balance)}
              </p>
            </Tooltip>
          </footer>
        ) : null}
      </div>
    </div>
  );
};

export default CashBoxCard;
