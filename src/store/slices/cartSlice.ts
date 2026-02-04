import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CartState, Product } from '../../types';

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

export const cartSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existCartItem = state.items.find((item) => item.product.id === action.payload.id);
      if (existCartItem) {
        existCartItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.product.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItemFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
