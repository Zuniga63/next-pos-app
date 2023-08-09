import { AuthResponse, SigninData, UpdatePasswordRequest } from '@/types';
import axios from 'axios';

export const authApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL_API}/auth/local` });

export const loginUser = async (data: SigninData) => {
  const res = await authApi.post<AuthResponse>('/singin', data);
  return res.data;
};

export const updateUserPassword = async (data: UpdatePasswordRequest) => {
  const res = await authApi.patch('/profile/change-password', data);
  return res.data;
};
