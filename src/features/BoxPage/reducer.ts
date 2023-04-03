import { createReducer } from '@reduxjs/toolkit';
import { ErrorResponse } from 'src/types';
import {
  closeBox,
  fetchBoxes,
  getGlobalBalance,
  hideCashTransferForm,
  hideCreateForm,
  hideTransactionForm,
  mountBox,
  mountBoxToClose,
  mountBoxToOpen,
  mountGlobalTransactions,
  openBox,
  removeBox,
  removeTransaction,
  showCashTransferForm,
  showCreateForm,
  showTransactionForm,
  storeBox,
  storeCashTransfer,
  storeTransaction,
  unmountBox,
  unmountBoxToClose,
  unmountBoxToOpen,
  unmountTransactions,
} from './actions';
import { BoxPageState } from './types';

const initialState: BoxPageState = {
  boxes: [],
  balance: 0,
  firstFetchLoading: true,
  fetchLoading: true,
  fetchIsSuccess: false,
  fetchError: null,
  showingMainBox: false,
  changeIsSuccess: false,
  // add box property
  createFormOpened: false,
  storeBoxLoading: false,
  storeBoxIsSuccess: false,
  storeBoxError: null,
  // open box property
  boxToOpen: undefined,
  openBoxLoading: false,
  openBoxIsSuccess: false,
  openBoxError: null,
  // Close box properties
  boxToClose: undefined,
  closeBoxLoading: false,
  closeBoxIsSuccess: false,
  closeBoxError: null,
  // Show Box
  boxSelected: undefined,
  transactions: [],
  loadingTransactions: false,
  mountBoxIsSuccess: false,
  transactionsError: null,
  // add transaction
  storeTransactionFormOpened: false,
  storeTransactionLoading: false,
  storeTransactionIsSuccess: false,
  storeTransactionError: null,
  // CASH TRANSFER
  cashTransferFormOpened: false,
  cashTransferLoading: false,
  cashTransferIsSuccess: false,
  cashTransferError: null,
};

export const boxPageReducer = createReducer(initialState, builder => {
  // --------------------------------------------------------------------------
  // MOUNTH BOXES
  // --------------------------------------------------------------------------
  builder
    .addCase(fetchBoxes.pending, state => {
      state.fetchLoading = true;
      state.fetchError = null;
      state.fetchIsSuccess = false;
      state.changeIsSuccess = false;
    })
    .addCase(fetchBoxes.fulfilled, (state, { payload }) => {
      if (state.firstFetchLoading) {
        state.firstFetchLoading = false;
      }
      state.boxes = payload;
      state.fetchLoading = false;
      state.fetchIsSuccess = true;
      state.changeIsSuccess = true;

      // Unmount Current box
      state.showingMainBox = false;
      state.boxSelected = undefined;
      state.transactions = [];
    })
    .addCase(fetchBoxes.rejected, state => {
      state.fetchLoading = false;
      state.fetchError = 'Error al cargar las cajas';
    });

  builder.addCase(getGlobalBalance.fulfilled, (state, { payload }) => {
    state.balance = payload;
  });
  // --------------------------------------------------------------------------
  // CREATE NEW BOXES
  // --------------------------------------------------------------------------
  builder
    .addCase(showCreateForm, state => {
      state.createFormOpened = true;
    })
    .addCase(hideCreateForm, state => {
      state.createFormOpened = false;
      state.storeBoxLoading = false;
      state.storeBoxError = null;
      state.storeBoxIsSuccess = false;
    })
    .addCase(storeBox.pending, state => {
      state.storeBoxLoading = true;
      state.storeBoxError = null;
      state.storeBoxIsSuccess = false;
      state.changeIsSuccess = false;
    })
    .addCase(storeBox.fulfilled, (state, { payload }) => {
      state.boxes.push(payload);
      state.storeBoxIsSuccess = true;
      state.storeBoxLoading = false;
      state.changeIsSuccess = true;
    })
    .addCase(storeBox.rejected, (state, { payload }) => {
      state.storeBoxError = payload as ErrorResponse;
      state.storeBoxLoading = false;
    });
  // --------------------------------------------------------------------------
  // OPEN BOX
  // --------------------------------------------------------------------------
  builder
    .addCase(mountBoxToOpen, (state, { payload }) => {
      state.boxToOpen = state.boxes.find(box => box.id === payload);
    })
    .addCase(unmountBoxToOpen, state => {
      state.boxToOpen = undefined;
      state.openBoxLoading = false;
      state.openBoxIsSuccess = false;
      state.openBoxError = null;
    })
    .addCase(openBox.pending, state => {
      state.openBoxLoading = true;
      state.openBoxIsSuccess = false;
      state.openBoxError = null;
      state.changeIsSuccess = false;
    })
    .addCase(openBox.fulfilled, (state, { payload }) => {
      const index = state.boxes.findIndex(box => box.id === payload.id);
      if (index >= 0) {
        state.boxes.splice(index, 1, payload);
        state.openBoxIsSuccess = true;
        state.changeIsSuccess = true;
      }

      state.openBoxLoading = false;
    })
    .addCase(openBox.rejected, (state, { payload }) => {
      state.openBoxLoading = false;
      state.openBoxError = payload as ErrorResponse;
    });
  // --------------------------------------------------------------------------
  // CLOSE BOX
  // --------------------------------------------------------------------------
  builder
    .addCase(mountBoxToClose, (state, { payload }) => {
      state.boxToClose = state.boxes.find(box => box.id === payload);
    })
    .addCase(unmountBoxToClose, state => {
      state.boxToClose = undefined;
      state.closeBoxLoading = false;
      state.closeBoxIsSuccess = false;
      state.closeBoxError = null;
    })
    .addCase(closeBox.pending, state => {
      state.closeBoxLoading = true;
      state.closeBoxIsSuccess = false;
      state.closeBoxError = null;
      state.changeIsSuccess = false;
    })
    .addCase(closeBox.fulfilled, (state, { payload }) => {
      const index = state.boxes.findIndex(box => box.id === payload.id);
      if (index >= 0) {
        state.boxes.splice(index, 1, payload);
        state.closeBoxIsSuccess = true;
        state.changeIsSuccess = true;
      }

      if (state.boxSelected && state.boxSelected.id === payload.id) {
        state.boxSelected = undefined;
        state.transactions = [];
      }

      state.closeBoxLoading = false;
    })
    .addCase(closeBox.rejected, (state, { payload }) => {
      state.closeBoxLoading = false;
      state.closeBoxError = payload as ErrorResponse;
    });
  // --------------------------------------------------------------------------
  // SHOW BOX TRANSACTION
  // --------------------------------------------------------------------------
  builder
    .addCase(mountBox.pending, state => {
      state.loadingTransactions = true;
      state.mountBoxIsSuccess = false;
      state.transactionsError = null;
      state.showingMainBox = false;
      state.changeIsSuccess = false;
    })
    .addCase(mountBox.fulfilled, (state, { payload }) => {
      const { boxes } = state;
      const cashboxIndex = boxes.findIndex(item => item.id === payload.id);

      if (cashboxIndex >= 0) {
        const cashbox = boxes[cashboxIndex];

        if (cashbox.balance !== payload.balance) {
          cashbox.balance = payload.balance;
          boxes.splice(cashboxIndex, 1, cashbox);
          state.boxes = boxes;
        }

        state.boxSelected = cashbox;
        state.transactions = payload.transactions;
        state.mountBoxIsSuccess = true;
        state.changeIsSuccess = true;
      }

      state.loadingTransactions = false;
    })
    .addCase(mountBox.rejected, (state, { payload }) => {
      state.loadingTransactions = false;
      state.transactionsError = payload as ErrorResponse | null;
    });

  builder.addCase(unmountBox, state => {
    state.boxSelected = undefined;
    state.showingMainBox = false;
    state.transactions = [];
  });
  // --------------------------------------------------------------------------
  // SHOW MAIN TRANSACTION
  // --------------------------------------------------------------------------
  builder
    .addCase(mountGlobalTransactions.pending, state => {
      state.loadingTransactions = true;
      state.mountBoxIsSuccess = false;
      state.transactionsError = null;
    })
    .addCase(mountGlobalTransactions.fulfilled, (state, { payload }) => {
      state.showingMainBox = true;
      state.boxSelected = undefined;
      state.transactions = payload;
      state.mountBoxIsSuccess = true;
      state.loadingTransactions = false;
    })
    .addCase(mountGlobalTransactions.rejected, (state, { payload }) => {
      state.loadingTransactions = false;
      state.transactionsError = payload as ErrorResponse | null;
    });
  // --------------------------------------------------------------------------
  // TRANSACTION FORM
  // --------------------------------------------------------------------------
  builder
    .addCase(showTransactionForm, state => {
      state.storeTransactionFormOpened = true;
    })
    .addCase(hideTransactionForm, state => {
      state.storeTransactionFormOpened = false;
      state.storeTransactionLoading = false;
      state.storeTransactionIsSuccess = false;
      state.storeTransactionError = null;
    });

  builder
    .addCase(storeTransaction.pending, state => {
      state.storeTransactionLoading = true;
      state.storeTransactionIsSuccess = false;
      state.storeTransactionError = null;
      state.changeIsSuccess = false;
    })
    .addCase(storeTransaction.fulfilled, (state, { payload }) => {
      const { cashbox } = payload;

      // *Update the balance of box
      state.balance += payload.amount;

      if (cashbox) {
        const boxIndex = state.boxes.findIndex(box => box.id === cashbox);
        if (boxIndex >= 0) {
          const box = state.boxes[boxIndex];
          box.balance = (box.balance || 0) + payload.amount;
          payload.balance = box.balance;
          state.boxes.splice(boxIndex, 1, box);
          if (state.boxSelected && state.boxSelected.id === box.id) {
            state.boxSelected = box;
          }
        }
      } else {
        payload.balance = state.balance;
      }

      state.transactions.push(payload);
      state.storeTransactionIsSuccess = true;
      state.storeTransactionLoading = false;
      state.changeIsSuccess = true;
    })
    .addCase(storeTransaction.rejected, (state, { payload }) => {
      state.storeTransactionLoading = false;
      state.storeTransactionError = payload as ErrorResponse | null;
    });
  // --------------------------------------------------------------------------
  // DELETE
  // --------------------------------------------------------------------------
  builder.addCase(unmountTransactions, state => {
    state.showingMainBox = false;
    state.boxSelected = undefined;
    state.transactions = [];
  });
  builder.addCase(removeBox, (state, { payload }) => {
    state.boxes = state.boxes.filter(box => box.id !== payload);
  });
  builder.addCase(removeTransaction, (state, { payload }) => {
    const { transactions, boxSelected, boxes } = state;
    const transactionIndex = transactions.findIndex(({ id }) => id === payload);

    if (transactionIndex >= 0) {
      const transaction = transactions[transactionIndex];
      // Update box balance
      if (transaction.cashbox) {
        const { cashbox, amount } = transaction;
        const boxId = typeof cashbox === 'string' ? cashbox : cashbox.id;
        const boxIndex = boxes.findIndex(({ id }) => id === boxId);
        if (boxIndex >= 0) {
          const box = boxes[boxIndex];
          box.balance = (box.balance || 0) - amount;

          state.boxes.splice(boxIndex, 1, box);

          if (boxSelected && boxSelected.id === cashbox) {
            state.boxSelected = box;
          }
        }
      }

      state.transactions.splice(transactionIndex, 1);
      state.balance -= transaction.amount;
    }
  });

  // --------------------------------------------------------------------------
  // CASH TRANSFER
  // --------------------------------------------------------------------------
  builder
    .addCase(showCashTransferForm, state => {
      state.cashTransferFormOpened = Boolean(
        state.showingMainBox || state.boxSelected
      );
    })
    .addCase(hideCashTransferForm, state => {
      state.cashTransferFormOpened = false;
      state.cashTransferIsSuccess = false;
      state.cashTransferLoading = false;
      state.cashTransferError = null;
    });

  builder
    .addCase(storeCashTransfer.pending, state => {
      state.cashTransferLoading = true;
      state.cashTransferIsSuccess = false;
      state.cashTransferError = null;
    })
    .addCase(storeCashTransfer.fulfilled, (state, { payload }) => {
      const boxes = state.boxes.slice();
      const { senderBoxId, addresseeBoxId, senderTransaction } = payload;

      const senderBox = boxes.find(box => box.id === senderBoxId);
      const addresseeBox = boxes.find(box => box.id === addresseeBoxId);

      if (senderBox && addresseeBox) {
        const amount = Math.abs(senderTransaction.amount);
        senderBox.balance -= amount;
        addresseeBox.balance += amount;
        senderTransaction.balance = senderBox.balance;

        if (state.boxSelected) {
          state.boxSelected.balance = senderBox.balance;
        }
      }

      state.transactions.push(senderTransaction);
      state.cashTransferLoading = false;
      state.cashTransferIsSuccess = true;
      state.boxes = boxes;
    })
    .addCase(storeCashTransfer.rejected, (state, { payload }) => {
      state.cashTransferLoading = false;
      state.cashTransferError = payload as ErrorResponse | null;
    });
});

export default boxPageReducer;
