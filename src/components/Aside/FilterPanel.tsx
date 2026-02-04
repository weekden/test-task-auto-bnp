import { useEffect, useState } from 'react';

import { fetchCategories } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectIsFilters, selectSelectedCategory } from '../../store/catalogSelectors';
import { toggleCategory } from '../../store/catalogSlice';
import styles from './FilterPanel.module.css';

function FilterPanel() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);
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
        <h3 className={styles.title}>Sort</h3>

        <div className={styles.sortGroup}>
          <select className={styles.select}>
            <option value="">No sort</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="title-asc">A → Z</option>
            <option value="title-desc">Z → A</option>
          </select>
        </div>
      </div>

      <button className={styles.reset} disabled={!isFilters}>
        Reset filters
      </button>
    </div>
  );
}
export default FilterPanel;
