import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { SigninData, AuthResponse, IUser } from './types';

const baseUrl = '/auth/local';

export const signin = createAsyncThunk(
  'auth/signin',
  async (data: SigninData, { rejectWithValue }) => {
    const url = `${baseUrl}/signin`;
    try {
      const res = await axios.post<AuthResponse>(url, data);
      return res.data;
    } catch (error) {
      if (!axios.isAxiosError(error) || !error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const authenticate = createAsyncThunk('auth/authenticate', async () => {
  const url = `${baseUrl}/profile`;
  const token = getCookie('access_token');

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await axios.get<IUser>(url);

  return res.data;
});

export const logout = createAction('auth/logout');
export const authSuccessIsNotify = createAction('auth/authSuccessIsNotify');
