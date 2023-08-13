import { Metadata } from 'next';
import BoxList from './_components/BoxList';
import BoxesContainer from './_components/BoxesContainer';
import CashboxForm from './_components/CashboxForm';
import DeleteDialog from './_components/DeleteDialog';
import OpenBoxForm from './_components/OpenBoxForm';
import CloseBoxForm from './_components/CloseBoxForm';
import MinorBoxInfo from './_components/MinorBoxInfo';
import DeleteTransactionDialog from './_components/DeleteTransactionDialog';
import TransactionForm from './_components/TransactionForm';
import CashTransferForm from './_components/CashTransferForm';
import GlobalBoxInfo from './_components/GlobalBoxInfo';
import BoxSum from './_components/BoxSum';

export const metadata: Metadata = {
  title: 'Cajas',
};

export default function BoxesPage() {
  return (
    <BoxesContainer>
      <BoxList />
      <MinorBoxInfo />
      <GlobalBoxInfo />
      <BoxSum />

      <CashboxForm />
      <DeleteDialog />
      <OpenBoxForm />
      <CloseBoxForm />
      <DeleteTransactionDialog />
      <TransactionForm />
      <CashTransferForm />
    </BoxesContainer>
  );
}
