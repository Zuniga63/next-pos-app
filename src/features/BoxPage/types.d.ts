import { Dayjs } from 'dayjs';
import { ErrorResponse } from '@/types';

export interface ICashier {
  id: string;
  name: string;
}

export interface IBox {
  id: string;
  users: string[];
  cashier?: ICashier;
  cashierName?: string;
  name: string;
  base: number;
  balance: number;
  openBox?: string; // string Date
  closed?: string; // string Date
  transactions: string[];
  closingRecords: string[];
  createdAt: strig; // string Date
  updatedAt: string; // string Date
}

export interface ITransaction {
  id: string;
  cashbox?: string | { id: strig; name: string };
  transactionDate: string;
  description: string;
  isTransfer: string;
  amount: number;
  balance: number;
  createdAt: strig; // string Date
  updatedAt: string; // string Date
}

export interface ICashboxFull extends IBox {
  transactions: ITransaction[];
}

export interface ITransactionRequest {
  date?: Dayjs;
  description: string;
  amount: number;
}

export interface IBoxesResponse {
  boxes: IBox[];
  mainBox: IMainBox | null;
}

export interface IOpenBoxRequest {
  boxId: string;
  base: number;
  cashierId?: string;
}

export interface ICloseBoxRequest {
  boxId: string;
  cash: number;
  observations?: string;
}

export interface IStoreTransactionRequest {
  boxId?: string;
  date?: Dayjs;
  description: string;
  amount: number;
}

export interface ICashTransferRequest {
  senderBoxId: string;
  addresseeBoxId: string;
  transferDate: Dayjs;
  amount: number;
  description?: string;
}

export interface ICashTransferResponse {
  senderBoxId: string;
  addresseeBoxId: string;
  senderTransaction: ITransaction;
}

export type BoxPageState = {
  boxes: IBox[];
  balance: number;
  firstFetchLoading: boolean;
  fetchLoading: boolean;
  fetchError: string | null;
  fetchIsSuccess: boolean;
  changeIsSuccess: boolean;
  showingMainBox: boolean;
  // Add box
  createFormOpened: boolean;
  storeBoxLoading: boolean;
  storeBoxIsSuccess: boolean;
  storeBoxError: ErrorResponse | null;
  // Open box
  boxToOpen?: IBox;
  openBoxLoading: boolean;
  openBoxIsSuccess: boolean;
  openBoxError: ErrorResponse | null;
  // Close Box
  boxToClose?: IBox;
  closeBoxLoading: boolean;
  closeBoxIsSuccess: boolean;
  closeBoxError: ErrorResponse | null;
  // Show Box
  boxSelected?: IBox;
  loadingTransactions: boolean;
  mountBoxIsSuccess: boolean;
  transactions: ITransaction[];
  transactionsError: ErrorResponse | null;
  // Add Transaction
  storeTransactionFormOpened: boolean;
  storeTransactionLoading: boolean;
  storeTransactionIsSuccess: boolean;
  storeTransactionError: ErrorResponse | null;
  // CASH TRANSFER
  cashTransferFormOpened: boolean;
  cashTransferLoading: boolean;
  cashTransferIsSuccess: boolean;
  cashTransferError: ErrorResponse | null;
};
