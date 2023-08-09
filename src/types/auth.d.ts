import { IImage } from '@/types';

export interface IUser {
  id: string;
  name: string;
  role?: string;
  email: string;
  profilePhoto?: IImage;
  isActive: boolean;
  isAdmin: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  user?: IUser;
}

export type AuthErrorResponse = {
  statusCode: number;
  path: string;
  errorType: string;
  timestamp: string;
  errorMessage: string;
};

export type AuthState = {
  isAuth: boolean;
  user?: IUser;
  error: null | string;
  isAdmin: boolean;
  loading: boolean;
  authIsSuccess: boolean;
};

export type UpdatePasswordRequest = {
  password: string;
  newPassword: string;
  passwordConfirm: string;
};
