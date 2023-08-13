import { ITransaction } from '@/types';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

interface ICashboxesState {
  isGlobal: boolean;
  cashboxFormOpened: boolean;
  sumBoxesId: string[];
  cashboxIdToEdit?: string;
  cashboxIdToDelete?: string;
  cashboxIdToOpen?: string;
  cashboxIdToClose?: string;
  loadingInfo?: string;
  cashboxIdToShow?: string;
  transactionToDelete?: ITransaction;
  transactionFormOpened: boolean;
  transactionToEdit?: ITransaction;
  cashTransferFormOpened: boolean;
}

interface ICashboxesActions {
  showCashboxForm: (id?: string) => void;
  hideCashboxForm: () => void;
  mountBoxToDelete: (id: string) => void;
  unmountBoxToDelete: () => void;
  mountBoxToOpen: (id: string) => void;
  unmountBoxToOpen: () => void;
  mountBoxToClose: (id: string) => void;
  unmountBoxToClose: () => void;
  mountBoxToShow: (id: string) => void;
  unmountBoxToShow: () => void;
  notifyLoadingInfoEnd: () => void;
  mountTransactionToDelte: (transaction: ITransaction) => void;
  unmountTransactionToDelete: () => void;
  showTransactionForm: (transaction?: ITransaction) => void;
  hideTransactionForm: () => void;
  showCashTransferForm: () => void;
  hideCashTransferForm: () => void;
  showGlobalBox: () => void;
  hideGlobalBox: () => void;
  addBoxToSum: (id: string) => void;
  removeBoxToSum: (id: string) => void;
  reset: () => void;
}

export const useCashboxesStore = createWithEqualityFn<ICashboxesState & ICashboxesActions>()(
  (set, get) => ({
    isGlobal: false,
    cashboxFormOpened: false,
    cashboxIdToEdit: undefined,
    cashboxIdToDelete: undefined,
    transactionFormOpened: false,
    cashTransferFormOpened: false,
    sumBoxesId: [],
    // --------------------------------------------------------------------------
    // CREATE AND UPDATE ACTIONS
    // --------------------------------------------------------------------------
    showCashboxForm(id) {
      set(() => ({ cashboxFormOpened: true, cashboxIdToEdit: id }));
    },
    hideCashboxForm() {
      set(() => ({ cashboxFormOpened: false, cashboxIdToEdit: undefined }));
    },
    // --------------------------------------------------------------------------
    // DELETE ACTIONS
    // --------------------------------------------------------------------------
    mountBoxToDelete(id) {
      set(() => ({ cashboxIdToDelete: id }));
    },
    unmountBoxToDelete() {
      set(() => ({ cashboxIdToDelete: undefined }));
    },
    // --------------------------------------------------------------------------
    // OPEN AND CLOSE BOX ACTIONS
    // --------------------------------------------------------------------------
    mountBoxToOpen(id) {
      set(() => ({ cashboxIdToOpen: id }));
    },
    unmountBoxToOpen() {
      set(() => ({ cashboxIdToOpen: undefined }));
    },
    mountBoxToClose(id) {
      set(() => ({ cashboxIdToClose: id }));
    },
    unmountBoxToClose() {
      set(() => ({ cashboxIdToClose: undefined }));
    },
    // --------------------------------------------------------------------------
    // VIZUALIZE BOX INFO
    // --------------------------------------------------------------------------
    mountBoxToShow(id) {
      set(() => ({ cashboxIdToShow: id, loadingInfo: id, isGlobal: false }));
    },
    unmountBoxToShow() {
      set(() => ({ cashboxIdToShow: undefined, loadingInfo: undefined }));
    },
    notifyLoadingInfoEnd() {
      set(() => ({ loadingInfo: undefined }));
    },
    // --------------------------------------------------------------------------
    // TRANSACTION CRUD
    // --------------------------------------------------------------------------
    mountTransactionToDelte(transaction) {
      set(() => ({ transactionToDelete: transaction }));
    },
    unmountTransactionToDelete() {
      set(() => ({ transactionToDelete: undefined }));
    },
    showTransactionForm(transaction) {
      set(() => ({ transactionFormOpened: true, transactionToEdit: transaction }));
    },
    hideTransactionForm() {
      set(() => ({ transactionFormOpened: false, transactionToEdit: undefined }));
    },
    showCashTransferForm() {
      set(() => ({ cashTransferFormOpened: true }));
    },
    hideCashTransferForm() {
      set(() => ({ cashTransferFormOpened: false }));
    },
    showGlobalBox() {
      set(() => ({ cashboxIdToShow: undefined, loadingInfo: undefined, isGlobal: true }));
    },
    hideGlobalBox() {
      set(() => ({ isGlobal: false }));
    },
    addBoxToSum(id) {
      const ids = get().sumBoxesId;
      const exits = ids.includes(id);
      if (!exits) set(state => ({ sumBoxesId: [...state.sumBoxesId, id] }));
    },
    removeBoxToSum(id) {
      const ids = get().sumBoxesId.slice();
      const exits = ids.findIndex(item => item === id);
      if (exits >= 0) {
        ids.splice(exits, 1);
        set(() => ({ sumBoxesId: ids }));
      }
    },
    reset() {
      set(() => ({
        isGlobal: false,
        cashboxFormOpened: undefined,
        cashboxIdToEdit: undefined,
        cashboxIdToDelete: undefined,
        cashboxIdToOpen: undefined,
        cashboxIdToClose: undefined,
        loadingInfo: undefined,
        cashboxIdToShow: undefined,
        transactionToDelete: undefined,
        transactionFormOpened: false,
        transactionToEdit: undefined,
        cashTransferFormOpened: false,
        sumBoxesId: [],
      }));
    },
  }),
  shallow,
);
