import BoxListHeader from './BoxListHeader';
import BoxListBody from './BoxListBody';
import BoxListFooter from './BoxListFooter';

export default function BoxList() {
  return (
    <div className="w-full flex-shrink-0 flex-grow-0 lg:w-80">
      <BoxListHeader />
      <BoxListBody />
      <BoxListFooter />
    </div>
  );
}
