import { IBox } from '@/types';
import Actions from './BoxActions';
import CloseState from './BoxCloseState';
import Header from './BoxHeader';
import Container from './BoxContainer';
import Content from './BoxContent';
import BoxBalance from './BoxBalance';

type Props = {
  box: IBox;
};

export default function BoxCard({ box }: Props) {
  const isOpen = Boolean(box.openBox);

  return (
    <Container isOpen={isOpen}>
      <Header boxName={box.name} isOpen={isOpen} boxId={box.id} />
      <Content>
        <BoxBalance boxId={box.id} isOpen={isOpen} balance={box.balance} />
        <CloseState isOpen={isOpen} closed={box.closed} />
      </Content>
      <Actions isOpen={isOpen} cashboxId={box.id} />
    </Container>
  );
}
