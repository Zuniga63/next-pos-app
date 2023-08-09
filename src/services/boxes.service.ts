import {
  IBox,
  ICashTransferRequest,
  ICashTransferResponse,
  ICashboxFull,
  ICloseBoxRequest,
  IOpenBoxRequest,
  IStoreTransactionRequest,
  ITransaction,
} from '@/types';
import axios from 'axios';

export const boxesApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL_API}/cashboxes` });

export const getMinorBoxes = async () => {
  const res = await boxesApi.get<IBox[]>('/minors');
  return res.data;
};

export const getMinorBox = async ({ id }: { id?: string }) => {
  if (!id) return null;
  const res = await boxesApi.get<ICashboxFull>(`/minors/${id}`);
  return res.data;
};

export const createMinorBox = async (data: { name: string }) => {
  const res = await boxesApi.post<IBox>('/minors', data);
  return res.data;
};

export const updateMinorBox = async ({ name, id }: { name: string; id: string }) => {
  const res = await boxesApi.patch<IBox>(`/minors/${id}`, { name });
  return res.data;
};

export const deleteMinorBox = async ({ id }: { id: string }) => {
  const res = await boxesApi.delete<IBox>(`/minors/${id}`);
  return res.data;
};

export const openMinorBox = async ({ boxId, base, cashierId }: IOpenBoxRequest) => {
  const res = await boxesApi.patch<IBox>(`/minors/${boxId}/open-box`, { base, cashierId });
  return res.data;
};

export const closeMinorBox = async ({ boxId, cash, observations }: ICloseBoxRequest) => {
  const res = await boxesApi.patch<IBox>(`/minors/${boxId}/close-box`, { cash, observations });
  return res.data;
};

export const deleteTransaction = async ({
  id,
  boxId,
  isGlobal = false,
}: {
  id: string;
  boxId?: string;
  isGlobal?: boolean;
}) => {
  const url = isGlobal ? `/main/transactions/${id}` : `/minors/${boxId}/transactions/${id}`;
  const res = await boxesApi.delete<ITransaction>(url);
  return res.data;
};

export const storeTransaction = async ({
  boxId,
  isGlobal = false,
  data,
}: {
  boxId?: string;
  isGlobal?: boolean;
  data: IStoreTransactionRequest;
}) => {
  const url = isGlobal ? `/main/transactions` : `/minors/${boxId}/transactions`;
  const res = await boxesApi.post<ITransaction>(url, data);
  return res.data;
};

export const storeCashTransfer = async ({ data }: { data: ICashTransferRequest }) => {
  const res = await boxesApi.post<ICashTransferResponse>('/minors/cash-transfer', data);
  return res.data;
};

export const getGlobalTransactions = async () => {
  const res = await boxesApi.get<ITransaction[]>('/main/transactions');
  return res.data;
};
