import type { RootState } from './index';

export const selectCartItems = (state: RootState) => state.cart.items;
