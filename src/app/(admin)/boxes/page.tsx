import { Metadata } from 'next';
import BoxList from './components/BoxList';
import BoxesContainer from './components/BoxesContainer';
import CashboxForm from './components/CashboxForm';

export const metadata: Metadata = {
  title: 'Cajas',
};

export default function BoxesPage() {
  return (
    <BoxesContainer>
      <BoxList />
      <CashboxForm />
    </BoxesContainer>
  );
}
