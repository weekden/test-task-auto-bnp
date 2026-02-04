import { useEffect, useState } from 'react';

import { fetchProducts } from '../../api/products';
import FilterPanel from '../../components/Aside/FilterPanel';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectCurrentPage,
  selectPaginatedProducts,
  selectTotalPages,
} from '../../store/selectors/catalogSelectors';
import { setPage, setProducts } from '../../store/slices/catalogSlice';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectPaginatedProducts);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        dispatch(setProducts(data));
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
  }, [dispatch]);

  if (loading)
    return (
      <div className={styles.center}>
        <Spinner />
      </div>
    );
  if (error) return <div className={styles.center}>Error: {error}</div>;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Catalog Page</h2>
      <div className={styles.content}>
        <aside className={styles.aside}>
          <FilterPanel></FilterPanel>
        </aside>
        <div className={styles.productsSection}>
          {products.length === 0 ? (
            <div className={styles.center}>
              <h3>No products found</h3>
              <p>Try changing search or filters</p>
            </div>
          ) : (
            <div className={styles.productsFlex}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {products.length > 0 && (
            <Pagination
              onPrev={() => dispatch(setPage(currentPage - 1))}
              onNext={() => dispatch(setPage(currentPage + 1))}
              currentPage={currentPage}
              isLastPage={currentPage === totalPages}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </section>
  );
};
