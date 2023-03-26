import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { boxPageSelector, removeTransaction } from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ITransaction } from 'src/types';
import { currencyFormat } from 'src/utils';
import Swal from 'sweetalert2';

interface Props {
  transaction: ITransaction;
}
const TransactionTableItem = ({ transaction }: Props) => {
  const { showingMainBox: isMainBox } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();
  const otherBox =
    isMainBox && transaction.cashbox && typeof transaction.cashbox !== 'string'
      ? transaction.cashbox
      : null;

  const deleteTransaction = async () => {
    const { id, description, amount } = transaction;
    const url = otherBox
      ? `/cashboxes/minors/${otherBox.id}/transactions/${id}`
      : `/cashboxes/main/transactions/${id}`;

    const message = /*html */ `
      La transacción "<strong>${description}</strong>"
      por valor de <strong>${currencyFormat(amount)}</strong>
      será eliminada permanentemente y esta acción no puede revertirse.`;

    const result = await Swal.fire({
      title: '<strong>¿Desea eliminar la transacción?</strong>',
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
          await axios.delete<ITransaction>(url);
          result.ok = true;
          result.message = `¡La transacción por valor de <strong>${currencyFormat(
            amount
          )}</strong> fue eliminada con éxito!`;

          dispatch(removeTransaction(transaction.id));
        } catch (error) {
          if (error instanceof AxiosError) {
            const { response } = error;
            if (response?.status === 404) {
              dispatch(removeTransaction(transaction.id));
            }
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
      const title = ok
        ? '<strong>¡Transacción Eliminada!</strong>'
        : '¡Ops, algo salio mal!';
      const icon = ok ? 'success' : 'error';

      Swal.fire({ title, html: message, icon });
    }
  };

  return (
    <tr
      className={
        otherBox
          ? 'text-dark opacity-20 dark:text-gray-300'
          : 'text-dark dark:text-gray-300'
      }
    >
      {/* TRANSACTION DATE */}
      <td>
        <div className="whitespace-nowrap text-center">
          <p className="text-sm">
            {dayjs(transaction.transactionDate).format('DD/MM/YY hh:mm a')}
          </p>
          <p className="text-xs">
            {dayjs(transaction.transactionDate).fromNow()}
          </p>
        </div>
      </td>

      {/* DESCRIPTION */}
      <td className="px-3 py-2 text-sm">
        <div>
          <p className="text-xs lg:text-base">{transaction.description}</p>
          {otherBox ? (
            <p className="text-xs">
              <span>Pertence a: </span>
              <span className="font-bold">{otherBox.name}</span>
            </p>
          ) : null}
        </div>
      </td>

      {/* AMOUNT */}
      <td className="text-right">{currencyFormat(transaction.amount)}</td>

      {/* BALANCE */}
      <td
        className={
          otherBox
            ? `hidden text-sm line-through lg:table-cell`
            : `hidden  text-sm lg:table-cell`
        }
      >
        {currencyFormat(transaction.balance)}
      </td>
      <td>
        <div className="flex justify-center">
          <ActionIcon color="red" size="lg" onClick={deleteTransaction}>
            <IconTrash size={16} stroke={3} />
          </ActionIcon>
        </div>
      </td>
    </tr>
  );
};

export default TransactionTableItem;
