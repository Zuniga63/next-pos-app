import { Metadata } from 'next';
import Image from 'next/image';
import buildingPic from 'public/images/building-page.png';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Dashboard() {
  return (
    <div className="px-4 pb-40 lg:px-8">
      <div className="mb-2 flex flex-col items-center justify-center py-8 text-dark dark:text-light">
        <h1 className="m-0 text-center font-display text-2xl leading-tight">Bienvenido</h1>
        <p className="mt-4 text-center text-sm leading-tight">
          Este panel informativo se encuentra actualmente en construción.
        </p>
        <figure className="mt-4 w-6/12 overflow-hidden rounded-md shadow-lg">
          <Image src={buildingPic} alt="Building Page" />
        </figure>
      </div>
    </div>
  );
}
