import { useEffect, useState } from 'react';

import { fetchProducts } from '../../api/products';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import styles from './CatalogPage.module.css';

const ITEMS_ON_PAGE = 12;

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

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

  const totalPages = Math.ceil(products.length / ITEMS_ON_PAGE);
  const startIndex = (page - 1) * ITEMS_ON_PAGE;
  const currentProductList = products.slice(startIndex, startIndex + ITEMS_ON_PAGE);

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error) return <div className={styles.center}>Error: {error}</div>;

  return (
    <section className={styles.content}>
      <div className={styles.flex}>
        {currentProductList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        onPrev={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
        currentPage={page}
        isLastPage={page === totalPages}
        totalPages={totalPages}
      />
    </section>
  );
};
