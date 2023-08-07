import { Metadata } from 'next';
import BoxList from './_components/BoxList';
import BoxesContainer from './_components/BoxesContainer';
import CashboxForm from './_components/CashboxForm';
import DeleteDialog from './_components/DeleteDialog';
import OpenBoxForm from './_components/OpenBoxForm';
import CloseBoxForm from './_components/CloseBoxForm';
import MinorBoxInfo from './_components/MinorBoxInfo';

export const metadata: Metadata = {
  title: 'Cajas',
};

export default function BoxesPage() {
  return (
    <BoxesContainer>
      <BoxList />
      <MinorBoxInfo />

      <CashboxForm />
      <DeleteDialog />
      <OpenBoxForm />
      <CloseBoxForm />
    </BoxesContainer>
  );
}
