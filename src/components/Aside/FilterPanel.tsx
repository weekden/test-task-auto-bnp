import { useEffect, useState } from 'react';

import { fetchCategories } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectIsFilters,
  selectSelectedCategory,
  selectSelectedSort,
} from '../../store/catalogSelectors';
import { resetFilter, setSort, toggleCategory } from '../../store/catalogSlice';
import SearchInput from '../SearchInput/SaerchInput';
import styles from './FilterPanel.module.css';

function FilterPanel() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const selectedSort = useAppSelector(selectSelectedSort);
  const isFilters = useAppSelector(selectIsFilters);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
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
    loadCategories();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={styles.panel}>
      <div className={styles.block}>
        <h3 className={styles.title}>Categories</h3>
        <ul className={styles.list}>
          {categories.map((item) => (
            <li key={item} className={styles.item}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={() => dispatch(toggleCategory(item))}
                  checked={selectedCategory.includes(item)}
                />
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <div>
          <h3 className={styles.title}>Search</h3>
          <SearchInput></SearchInput>
        </div>
        <div>
          <h3 className={styles.title}>Sort</h3>
          <div className={styles.sortGroup}>
            <select
              value={selectedSort}
              className={styles.select}
              onChange={(e) => {
                switch (e.target.value) {
                  case 'price-asc':
                    dispatch(setSort({ sortBy: 'price', sortOrder: 'asc' }));
                    break;
                  case 'price-desc':
                    dispatch(setSort({ sortBy: 'price', sortOrder: 'desc' }));
                    break;
                  case 'title-asc':
                    dispatch(setSort({ sortBy: 'title', sortOrder: 'asc' }));
                    break;
                  case 'title-desc':
                    dispatch(setSort({ sortBy: 'title', sortOrder: 'desc' }));
                    break;
                  default:
                    dispatch(setSort({ sortBy: '', sortOrder: '' }));
                    break;
                }
              }}
            >
              <option value="">No sort</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="title-asc">Name A → Z</option>
              <option value="title-desc">Name Z → A</option>
            </select>
          </div>
        </div>
      </div>

      <button
        className={styles.reset}
        disabled={!isFilters}
        onClick={() => dispatch(resetFilter())}
      >
        Reset filters
      </button>
    </div>
  );
}
export default FilterPanel;
