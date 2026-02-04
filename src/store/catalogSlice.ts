import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CatalogState, Product } from '../types';

const initialState: CatalogState = {
  items: [],
  currentPage: 1,
  itemsPerPage: 12,
  selectedCategory: [],
  isFilters: false,
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

    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.selectedCategory.findIndex((item) => item === category);
      if (index === -1) {
        state.selectedCategory.push(category);
        state.isFilters = true;
      } else {
        state.selectedCategory.splice(index, 1);
        if (state.selectedCategory.length === 0) {
          state.isFilters = false;
        }
      }
      state.currentPage = 1;
    },
  },
});

export const { setProducts, setPage, toggleCategory } = productsSlice.actions;
export default productsSlice.reducer;
