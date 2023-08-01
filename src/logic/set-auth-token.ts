import { authApi } from '@/services/auth.service';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export function setAuthTokens() {
  const token = `Bearer ${getCookie('access_token')}`;

  axios.defaults.headers.common.Authorization = token;
  authApi.defaults.headers.common.Authorization = token;
}
