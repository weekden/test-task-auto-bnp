import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectSearchInputValue } from '../../store/selectors/catalogSelectors';
import { setSearchQuery } from '../../store/slices/catalogSlice';
import styles from './SearchInput.module.css';

function Search() {
  const dispatch = useAppDispatch();
  const searchStateValue = useAppSelector(selectSearchInputValue);
  const [value, setValue] = useState<string>(searchStateValue);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (value !== searchStateValue) {
        dispatch(setSearchQuery(value.trim()));
      }
    }, 300);

    return () => clearTimeout(timeOutId);
  }, [value, searchStateValue, dispatch]);

  useEffect(() => {
    setValue(searchStateValue);
  }, [searchStateValue]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search product"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default Search;
