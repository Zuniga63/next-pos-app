import { createReducer } from '@reduxjs/toolkit';
import { setCookie } from 'cookies-next';
import { buildCookieOption } from '@/utils';
import { authenticate, authSuccessIsNotify, logout, signin } from './actions';
import { AuthState, AuthErrorResponse } from '@/types';
import axios from 'axios';

const initialState: AuthState = {
  isAuth: false,
  user: undefined,
  error: null,
  isAdmin: false,
  loading: false,
  authIsSuccess: false,
};

export const saveAuthData = (token: string) => {
  setCookie('access_token', token, buildCookieOption(30));
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthData = () => {
  setCookie('access_token', '', buildCookieOption(0));
  axios.defaults.headers.common.Authorization = '';
};

export const authReducer = createReducer(initialState, builder => {
  builder
    //-------------------------------------------------------------------------
    // SIGNIN
    //-------------------------------------------------------------------------
    .addCase(signin.pending, state => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    })
    .addCase(signin.fulfilled, (state, { payload }) => {
      const { access_token, user } = payload;
      state.loading = false;
      if (access_token && user) {
        if (user.isActive && user.isAdmin) {
          state.isAuth = true;
          state.user = user;
          state.isAdmin = user.isAdmin;
          state.authIsSuccess = true;
          saveAuthData(access_token);
        } else {
          state.error = 'No tiene autorización';
        }
      }
    })
    .addCase(signin.rejected, (state, { payload }) => {
      const { statusCode } = payload as AuthErrorResponse;

      state.loading = false;
      state.error =
        statusCode && statusCode === 401
          ? 'Email o contraseña inválido'
          : 'Error desconocido, contacte con el administrador';
    })
    .addCase(authSuccessIsNotify, state => {
      state.authIsSuccess = false;
    });
  // ------------------------------------------------------------------------
  // APP AUTHENTICATE
  // ------------------------------------------------------------------------
  builder
    .addCase(authenticate.fulfilled, (state, { payload }) => {
      if (payload && payload.isActive && payload.isAdmin) {
        state.isAuth = true;
        state.user = payload;
        state.isAdmin = payload.isAdmin;
      } else {
        clearAuthData();
      }
    })
    .addCase(authenticate.rejected, state => {
      state = initialState;
      clearAuthData();
    });
  // ------------------------------------------------------------------------
  // APP LOGOUT
  // ------------------------------------------------------------------------
  builder.addCase(logout, state => {
    state = initialState;
    clearAuthData();
  });
});

export default authReducer;
