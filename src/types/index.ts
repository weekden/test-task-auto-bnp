export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItemType {
  product: Product;
  quantity: number;
}

export type CartState = {
  items: CartItemType[];
};

export interface CatalogState {
  items: Product[];
  currentPage: number;
  itemsPerPage: number;
  selectedCategory: string[];
  isFilters: boolean;
}
