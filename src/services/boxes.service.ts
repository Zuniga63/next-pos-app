import { IBox, ICashboxFull, ICloseBoxRequest, IOpenBoxRequest } from '@/types';
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
