import { IUser } from '@/types';
import { buildCookieOption } from '@/utils';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { create } from 'zustand';

interface IAuthState {
  isAuth: boolean;
  user?: IUser;
  isAdmin: boolean;
}

export const useLoginStore = create<IAuthState>(() => ({
  isAuth: false,
  isAdmin: false,
  user: undefined,
}));

export const saveCredentials = ({ user, token }: { user: IUser; token: string }) => {
  setCookie('access_token', token, buildCookieOption(30));
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return useLoginStore.setState(() => ({ user, isAuth: true, isAdmin: user.isAdmin }));
};

export const clearCredentials = () => {
  return useLoginStore.setState(() => ({ user: undefined, isAuth: false, isAdmin: false }));
};
