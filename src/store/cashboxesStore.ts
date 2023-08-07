import { create } from 'zustand';

interface ICashboxesState {
  cashboxFormOpened: boolean;
  cashboxIdToEdit?: string;
  cashboxIdToDelete?: string;
  cashboxIdToOpen?: string;
  cashboxIdToClose?: string;
  loadingInfo?: string;
  cashboxIdToShow?: string;
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
}

export const useCashboxesStore = create<ICashboxesState & ICashboxesActions>()((set, get) => ({
  cashboxFormOpened: false,
  cashboxIdToEdit: undefined,
  cashboxIdToDelete: undefined,
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
    set(() => ({ cashboxIdToShow: id, loadingInfo: id }));
  },
  unmountBoxToShow() {
    set(() => ({ cashboxIdToShow: undefined, loadingInfo: undefined }));
  },
  notifyLoadingInfoEnd() {
    set(() => ({ loadingInfo: undefined }));
  },
}));
