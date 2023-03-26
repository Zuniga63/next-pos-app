import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  IBox,
  ICashboxFull,
  ICloseBoxRequest,
  IOpenBoxRequest,
  IStoreTransactionRequest,
  ITransaction,
} from './types';
// ----------------------------------------------------------------------------
// MOUNT BOXES ACTIONS
// ----------------------------------------------------------------------------
export const fetchBoxes = createAsyncThunk(
  'boxPage/fetchBoxes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<IBox[]>('/cashboxes/minors');
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

export const getGlobalBalance = createAsyncThunk(
  'boxPage/getGlobalBalane',
  async () => {
    const res = await axios.get<number>('/cashboxes/main/balance');
    return res.data;
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
      const url = `/cashboxes/minors/${boxId}/open-box`;
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
    const url = `/cashboxes/minors/${boxId}/close-box`;

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
      const res = await axios.get<ICashboxFull>(`/cashboxes/minors/${boxId}`);
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

export const unmountBox = createAction('boxPage/unmountBox');
export const mountGlobalTransactions = createAsyncThunk(
  'boxPage/mountGlobalTransactions',
  async () => {
    const res = await axios.get<ITransaction[]>('/cashboxes/main/transactions');
    return res.data;
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
      ? `/cashboxes/minors/${data.boxId}/transactions`
      : `/cashboxes/main/transactions`;

    try {
      const res = await axios.post<ITransaction>(url, data);

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
