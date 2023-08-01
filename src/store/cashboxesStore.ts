import { create } from 'zustand';

interface ICashboxesState {
  cashboxFormOpened: boolean;
  cashboxIdToEdit?: string;
}

interface ICashboxesActions {
  showCashboxForm: (id?: string) => void;
  hideCashboxForm: () => void;
}

export const useCashboxesStore = create<ICashboxesState & ICashboxesActions>()((set, get) => ({
  cashboxFormOpened: false,
  cashboxIdToEdit: undefined,
  showCashboxForm(id) {
    set(() => ({ cashboxFormOpened: true, cashboxIdToEdit: id }));
  },
  hideCashboxForm() {
    set(() => ({ cashboxFormOpened: false, cashboxIdToEdit: undefined }));
  },
}));
