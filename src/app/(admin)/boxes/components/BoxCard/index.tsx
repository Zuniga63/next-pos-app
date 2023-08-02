import { IBox } from '@/types';
import { currencyFormat } from '@/utils';
import Actions from './Actions';
import CloseState from './CloseState';
import Header from './Header';
import Container from './Container';

type Props = {
  box: IBox;
};

export default function BoxCard({ box }: Props) {
  const isOpen = Boolean(box.openBox);

  return (
    <Container isOpen={isOpen}>
      <Header boxName={box.name} />
      <div className="border-x border-gray-200 bg-light px-4 py-2 dark:bg-none">
        {isOpen && <p className="text-center text-xl font-bold tracking-wider">{currencyFormat(box.balance)}</p>}
        <CloseState isOpen={isOpen} closed={box.closed} />B
      </div>

      <Actions isOpen={isOpen} />
    </Container>
  );
}
