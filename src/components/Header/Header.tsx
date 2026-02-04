import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { selectCartTotalCount } from '../../store/selectors';
import styles from './Header.module.css';

function Header() {
  const cartTotalCount = useAppSelector(selectCartTotalCount);
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Catalog
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Cart
            </NavLink>
            {cartTotalCount > 0 && <span className={styles.coin}>{cartTotalCount}</span>}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
