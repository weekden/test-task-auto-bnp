import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CatalogState, Product } from '../types';

const initialState: CatalogState = {
  items: [],
  currentPage: 1,
  itemsPerPage: 12,
};

export const productsSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setProducts, setPage } = productsSlice.actions;
export default productsSlice.reducer;
