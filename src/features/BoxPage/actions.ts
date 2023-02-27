import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  IBox,
  ICloseBoxRequest,
  IMainBox,
  IOpenBoxRequest,
  IStoreTransactionRequest,
  ITransactionResponse,
} from './types';
// ----------------------------------------------------------------------------
// MOUNT BOXES ACTIONS
// ----------------------------------------------------------------------------
export const mountBoxes = createAction<IBox[]>('boxPage/mountBoxes');
export const mountMainBox = createAction<IMainBox | null>(
  'boxPage/mountMainBox'
);
export const fetchBoxes = createAsyncThunk(
  'boxPage/fetchBoxes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get<IBox[]>('/cashboxes');
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);

export const removeBox = createAction<string>('pageBox/removeBox');
// ----------------------------------------------------------------------------
// STORE NEW BOXES
// ----------------------------------------------------------------------------
export const showCreateForm = createAction('boxPage/showCreateForm');
export const hideCreateForm = createAction('boxPage/hideCreateForm');
export const storeBox = createAsyncThunk(
  'boxPage/sotoreBox',
  async (data: { name: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post<IBox>('/cashboxes', data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);
// ----------------------------------------------------------------------------
// OPEN BOX
// ----------------------------------------------------------------------------
export const mountBoxToOpen = createAction<string>('boxPage/mountBoxToOpen');
export const unmountBoxToOpen = createAction('boxPage/unmountBoxToOpen');
export const openBox = createAsyncThunk(
  'boxPage/openBox',
  async (data: IOpenBoxRequest, { rejectWithValue }) => {
    try {
      const { boxId, ...rest } = data;
      const url = `/cashboxes/${boxId}/open-box`;
      const response = await axios.patch<IBox>(url, rest);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);
// ----------------------------------------------------------------------------
// CLOSE BOX
// ----------------------------------------------------------------------------
export const mountBoxToClose = createAction<string>('boxPage/mountBoxToClose');
export const unmountBoxToClose = createAction('boxPage/unmountBoxToClose');
export const closeBox = createAsyncThunk(
  'boxPage/closeBox',
  async (data: ICloseBoxRequest, { rejectWithValue }) => {
    const { boxId, ...rest } = data;
    const url = `/cashboxes/${boxId}/close-box`;

    try {
      const res = await axios.patch<IBox>(url, rest);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);
// ----------------------------------------------------------------------------
// MOUNT TRANSACTIONS
// ----------------------------------------------------------------------------
export const mountBox = createAsyncThunk(
  'boxPage/mountBox',
  async (boxId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/cashboxes/${boxId}`);
      const { transactions } = res.data;
      return { boxId, transactions };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);
export const mountGlobalTransactions = createAsyncThunk(
  'boxPage/mountGlobalTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<{ transactions: ITransactionResponse[] }>(
        '/main-box/transactions'
      );

      return res.data.transactions;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);

// ----------------------------------------------------------------------------
// TRANSACTIONS FORM
// ----------------------------------------------------------------------------
export const showTransactionForm = createAction('boxPage/showTransactionForm');
export const hideTransactionForm = createAction('boxPage/hideTransactionForm');
export const storeTransaction = createAsyncThunk(
  'boxPage/storeTransaction',
  async (data: IStoreTransactionRequest, { rejectWithValue }) => {
    const url = data.boxId
      ? `/cashboxes/${data.boxId}/transactions`
      : `/main-box/transactions`;

    try {
      const res = await axios.post<ITransactionResponse>(url, data);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data, status } = error.response;
        return rejectWithValue({ data, status });
      }

      throw error;
    }
  }
);
export const unmountTransactions = createAction('boxPage/unmountTransactions');

// ----------------------------------------------------------------------------
// DELETE TRANSACTION
// ----------------------------------------------------------------------------
export const removeTransaction = createAction<string>(
  'boxPage/removeTransaction'
);
