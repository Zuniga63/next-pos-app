import { Metadata } from 'next';
import BoxList from './_components/BoxList';
import BoxesContainer from './_components/BoxesContainer';
import CashboxForm from './_components/CashboxForm';
import DeleteDialog from './_components/DeleteDialog';
import OpenBoxForm from './_components/OpenBoxForm';

export const metadata: Metadata = {
  title: 'Cajas',
};

export default function BoxesPage() {
  return (
    <BoxesContainer>
      <BoxList />
      <CashboxForm />
      <DeleteDialog />
      <OpenBoxForm />
    </BoxesContainer>
  );
}
