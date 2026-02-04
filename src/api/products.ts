import type { Product } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/products/categories `);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products/category/${category} `);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};
