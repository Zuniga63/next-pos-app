import { IUser } from '@/types';
import { buildCookieOption } from '@/utils';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface IAuthState {
  isAuth: boolean;
  user?: IUser;
  isAdmin: boolean;
}

export const useLoginStore = createWithEqualityFn<IAuthState>(
  () => ({
    isAuth: false,
    isAdmin: false,
    user: undefined,
  }),
  shallow,
);

export const saveCredentials = ({ user, token }: { user: IUser; token: string }) => {
  setCookie('access_token', token, buildCookieOption(30));
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return useLoginStore.setState(() => ({ user, isAuth: true, isAdmin: user.isAdmin }));
};

export const clearCredentials = () => {
  setCookie('access_token', '', buildCookieOption(0));
  axios.defaults.headers.common.Authorization = '';
  return useLoginStore.setState(() => ({ user: undefined, isAuth: false, isAdmin: false }));
};
