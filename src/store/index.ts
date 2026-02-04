import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import productsSlice from './catalogSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalog: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
