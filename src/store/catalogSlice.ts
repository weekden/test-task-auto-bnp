import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CatalogState, Product } from '../types';

const initialState: CatalogState = {
  items: [],
  currentPage: 1,
  itemsPerPage: 12,
  selectedCategory: [],
  isFilters: false,
  sortBy: '',
  sortOrder: '',
  searchQuery: '',
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

    setSort: (
      state,
      action: PayloadAction<{ sortBy: 'price' | 'title' | ''; sortOrder: 'asc' | 'desc' | '' }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.isFilters = true;
      state.currentPage = 1;
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (state.searchQuery.length > 0) {
        state.isFilters = true;
      }
      state.currentPage = 1;
    },

    resetFilter: (state) => {
      state.isFilters = false;
      state.selectedCategory = [];
      state.sortBy = '';
      state.sortOrder = '';
      state.searchQuery = '';
      state.currentPage = 1;
    },
  },
});

export const { setProducts, setPage, toggleCategory, setSort, setSearchQuery, resetFilter } =
  productsSlice.actions;
export default productsSlice.reducer;
