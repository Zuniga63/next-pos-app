import { create } from 'zustand';

interface ICashboxesState {
  cashboxFormOpened: boolean;
  cashboxIdToEdit?: string;
  cashboxIdToDelete?: string;
}

interface ICashboxesActions {
  showCashboxForm: (id?: string) => void;
  hideCashboxForm: () => void;
  showDeleteDialog: (id: string) => void;
  closeDeleteDialog: () => void;
}

export const useCashboxesStore = create<ICashboxesState & ICashboxesActions>()((set, get) => ({
  cashboxFormOpened: false,
  cashboxIdToEdit: undefined,
  cashboxIdToDelete: undefined,
  showCashboxForm(id) {
    set(() => ({ cashboxFormOpened: true, cashboxIdToEdit: id }));
  },
  hideCashboxForm() {
    set(() => ({ cashboxFormOpened: false, cashboxIdToEdit: undefined }));
  },
  showDeleteDialog(id) {
    set(() => ({ cashboxIdToDelete: id }));
  },
  closeDeleteDialog() {
    set(() => ({ cashboxIdToDelete: undefined }));
  },
}));
