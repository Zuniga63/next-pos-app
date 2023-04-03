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
    <>
      <Layout title="Cajas">
        <div className="flex gap-x-4 px-8 py-2 text-dark dark:text-light">
          <div className="w-80 flex-shrink-0 flex-grow-0">
            <BoxList />
          </div>
          <div className="flex-grow">
            <BoxShow />
          </div>
        </div>
      </Layout>
      <CreateForm />
      <OpenBoxForm />
      <CloseBoxForm />
      <CreateTransactionForm />
      <CashTransferForm />
    </>
  );
};

export default BoxesPage;
