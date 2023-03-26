import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import { boxPageSelector } from 'src/features/BoxPage';
import BoxListHeader from './BoxListHeader';
import BoxListBody from './BoxListBody';
import BoxListFooter from './BoxListFooter';
import CashBoxCard from './CashBoxCard';

const BoxList = () => {
  const { boxes } = useAppSelector(boxPageSelector);
  return (
    <div>
      <BoxListHeader />
      <BoxListBody>
        {boxes.map(box => (
          <CashBoxCard box={box} key={box.id} />
        ))}
      </BoxListBody>
      <BoxListFooter />
    </div>
  );
};

export default BoxList;
