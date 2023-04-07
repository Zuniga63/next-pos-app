import BoxList from 'src/components/BoxPage/BoxList';
import BoxShow from 'src/components/BoxPage/BoxShow';
import CloseBoxForm from 'src/components/BoxPage/CloseBoxForm';
import CreateForm from 'src/components/BoxPage/CreateForm';
import OpenBoxForm from 'src/components/BoxPage/OpenBoxForm';
import Layout from 'src/components/Layout';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchBoxes,
  getGlobalBalance,
  unmountTransactions,
} from 'src/features/BoxPage';
import CreateTransactionForm from 'src/components/BoxPage/CreateTransactionForm';
import { authSelector } from 'src/features/Auth';
import CashTransferForm from 'src/components/BoxPage/CashTransferForm';

const BoxesPage: NextPage = () => {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchBoxes());
      dispatch(getGlobalBalance());
    }

    return () => {
      dispatch(unmountTransactions());
    };
  }, [isAuth]);
  return (
    <Layout title="Cajas">
      <div className="py-2 text-dark dark:text-light lg:flex lg:gap-x-4 lg:px-8">
        <div className="w-full flex-shrink-0 flex-grow-0 lg:w-80">
          <BoxList />
        </div>
        <div className="mt-4 flex-grow lg:mt-0">
          <BoxShow />
        </div>
      </div>

      <CreateForm />
      <OpenBoxForm />
      <CloseBoxForm />
      <CreateTransactionForm />
      <CashTransferForm />
    </Layout>
  );
};

export default BoxesPage;
