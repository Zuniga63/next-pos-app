import { Table } from '@mantine/core';
import { useEffect, useState, FC } from 'react';
import { currencyFormat } from 'src/utils';
import CashBoxBankNotesItem from './CashBoxBankNotesItem';

interface Props {
  amount: number;
  onChange(value: number): void;
  coins?: boolean;
}

const initialCoins = [
  { name: '$50', value: 50, count: 0, amount: 0 },
  { name: '$100', value: 100, count: 0, amount: 0 },
  { name: '$200', value: 200, count: 0, amount: 0 },
  { name: '$500', value: 500, count: 0, amount: 0 },
  { name: '$1000', value: 1000, count: 0, amount: 0 },
];

const initialBankNotes = [
  { name: '$1000', value: 1000, count: 0, amount: 0 },
  { name: '$2000', value: 2000, count: 0, amount: 0 },
  { name: '$5.000', value: 5000, count: 0, amount: 0 },
  { name: '$10.000', value: 10000, count: 0, amount: 0 },
  { name: '$20.000', value: 20000, count: 0, amount: 0 },
  { name: '$50.000', value: 50000, count: 0, amount: 0 },
  { name: '$100.000', value: 100000, count: 0, amount: 0 },
];

const CashBoxBankNotes: FC<Props> = ({ amount, onChange, coins }) => {
  const [bankNotes, setBankNotes] = useState(
    coins ? structuredClone(initialCoins) : structuredClone(initialBankNotes)
  );

  const updateCount = (index: number, count: number) => {
    setBankNotes(current => {
      const newList = current.slice();
      newList[index].count = count;
      newList[index].amount = current[index].value * count;
      return newList;
    });
  };

  useEffect(() => {
    let sum = 0;
    bankNotes.forEach(coin => {
      sum += coin.amount;
    });

    onChange(sum);
  }, [bankNotes]);

  return (
    <div>
      <h2
        className={
          coins
            ? 'mx-4 mb-4 mt-2 rounded-lg bg-amber-800 bg-opacity-20 py-2 text-center font-bold tracking-wider text-orange-500'
            : 'mx-4 mb-4 mt-2 rounded-lg bg-emerald-800 bg-opacity-20 py-2 text-center font-bold tracking-wider text-green-500'
        }
      >
        {coins ? 'Monedas' : 'Billetes'}
      </h2>

      <div className="mb-4 px-2">
        <Table withBorder>
          <thead>
            <tr>
              <th>
                <span></span>
              </th>
              <th>
                <h3 className="text-center">Cant.</h3>
              </th>
              <th>
                <h3 className="text-right">Valor</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {bankNotes.map((bankNote, index) => (
              <CashBoxBankNotesItem
                denomination={bankNote.name}
                value={bankNote.value}
                index={index}
                onChange={updateCount}
                key={bankNote.name}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3}>
                <p className="text-right font-bold tracking-widest">
                  Total: {currencyFormat(amount)}
                </p>
              </th>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
};

export default CashBoxBankNotes;
