import type { RootState } from '../index';

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

export const selectSelectedCategory = (state: RootState) => state.catalog.selectedCategory;
export const selectCatalogSortBy = (state: RootState) => state.catalog.sortBy;
export const selectCatalogSortOrder = (state: RootState) => state.catalog.sortOrder;
export const selectSelectedSort = (state: RootState) => {
  const sortBy = selectCatalogSortBy(state);
  const sortOrder = selectCatalogSortOrder(state);
  return sortBy || sortOrder ? `${sortBy}-${sortOrder}` : '';
};
export const selectIsFilters = (state: RootState) => {
  return state.catalog.isFilters || selectCatalogSortBy(state) || selectCatalogSortOrder(state);
};
export const selectSearchInputValue = (state: RootState) => state.catalog.searchQuery;

export const selectFilteredProducts = (state: RootState) => {
  const sortOrder = state.catalog.sortOrder;
  const sortBy = state.catalog.sortBy;

  let products = [...selectCatalogItems(state)];

  const selectedCategory = selectSelectedCategory(state);
  if (selectedCategory.length) {
    products = products.filter((item) => selectedCategory.includes(item.category));
  }

  if (state.catalog.searchQuery) {
    const query = state.catalog.searchQuery.toLocaleLowerCase();
    products = products.filter((item) => item.title.toLocaleLowerCase().includes(query));
  }

  if (sortBy === 'price') {
    products.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  } else if (sortBy === 'title') {
    products.sort((a, b) =>
      sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
    );
  }

  return products;
};
