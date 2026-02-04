import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import productsSlice from './slices/catalogSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalog: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
