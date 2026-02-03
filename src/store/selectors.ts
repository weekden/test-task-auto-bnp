import type { RootState } from './index';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
