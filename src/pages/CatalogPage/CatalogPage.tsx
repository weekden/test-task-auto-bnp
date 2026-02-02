import { useEffect, useState } from 'react';

import { fetchProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error) return <div className={styles.center}>Error: {error}</div>;

  return (
    <>
      <div className={styles.flex}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
