import { IBox } from '@/types';
import axios from 'axios';

export const boxesApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL_API}/cashboxes` });

export const getMinorBoxes = async () => {
  const res = await boxesApi.get<IBox[]>('/minors');
  return res.data;
};

export const createMinorBox = async (data: { name: string }) => {
  const res = await boxesApi.post<IBox>('/minors', data);
  return res.data;
};

export const deleteMinorBox = async ({ id }: { id: string }) => {
  const res = await boxesApi.delete<IBox>(`/minors/${id}`);
  return res.data;
};
