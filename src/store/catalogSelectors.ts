import type { RootState } from './index';

export const selectCatalogItems = (state: RootState) => state.catalog.items;
export const selectCurrentPage = (state: RootState) => state.catalog.currentPage;
export const selectItemsPerPage = (state: RootState) => state.catalog.itemsPerPage;
export const selectTotalPages = (state: RootState) => {
  return Math.ceil(selectFilteredProducts(state).length / state.catalog.itemsPerPage);
};

export const selectPaginatedProducts = (state: RootState) => {
  const catalogItems = selectFilteredProducts(state);
  const startIndex = (state.catalog.currentPage - 1) * state.catalog.itemsPerPage;
  return catalogItems.slice(startIndex, startIndex + state.catalog.itemsPerPage);
};

export const selectIsFilters = (state: RootState) => state.catalog.isFilters;

export const selectSelectedCategory = (state: RootState) => state.catalog.selectedCategory;

export const selectFilteredProducts = (state: RootState) => {
  const products = selectCatalogItems(state);

  if (!state.catalog.selectedCategory.length) {
    return products;
  }

  return products.filter((product) => state.catalog.selectedCategory.includes(product.category));
};
