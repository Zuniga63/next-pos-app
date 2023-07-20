import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '@/features/Auth';
import { boxPageReducer } from '@/features/BoxPage';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    boxPage: boxPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
