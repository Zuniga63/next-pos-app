import type { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useRef } from 'react';

import Layout from '@/components/Layout';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { authSelector } from '@/features/Auth';
import Image from 'next/image';
import buildingPic from '../../public/images/building-page.png';

dayjs.extend(isLeapYear);

const Home: NextPage = () => {
  const { user } = useAppSelector(authSelector);
  const firtsRenderRef = useRef(true);

  useEffect(() => {
    if (firtsRenderRef.current) {
      firtsRenderRef.current = false;
      return;
    }
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="px-4 pb-40 lg:px-8">
        <div className="mb-2 flex flex-col items-center justify-center py-8 text-dark dark:text-light">
          <h1 className="m-0 text-center text-2xl leading-tight">Bienvenido {user?.name}</h1>
          <p className="mt-4 text-center text-sm leading-tight">
            Este panel informativo se encuentra actualmente en construción.
          </p>
          <figure className="mt-4 w-6/12 overflow-hidden rounded-md shadow-lg">
            <Image src={buildingPic} alt="Building Page" />
          </figure>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
