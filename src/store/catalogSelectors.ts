import type { RootState } from './index';

export const selectCatalogItems = (state: RootState) => state.catalog.items;
export const selectCurrentPage = (state: RootState) => state.catalog.currentPage;
export const selectItemsPerPage = (state: RootState) => state.catalog.itemsPerPage;
export const selectTotalPages = (state: RootState) => {
  return Math.ceil(selectCatalogItems(state).length / state.catalog.itemsPerPage);
};

export const selectPaginatedProducts = (state: RootState) => {
  const catalogItems = selectCatalogItems(state);
  const startIndex = (state.catalog.currentPage - 1) * state.catalog.itemsPerPage;
  return catalogItems.slice(startIndex, startIndex + state.catalog.itemsPerPage);
};
