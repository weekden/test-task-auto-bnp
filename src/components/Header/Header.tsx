import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import cartImg from '../../../public/icons/cart.png';
import moonImg from '../../../public/icons/moon.png';
import sunImg from '../../../public/icons/sun.png';
import { useAppSelector } from '../../hooks/redux';
import { selectCartTotalCount } from '../../store/selectors';
import type { ThemeType } from '../../types';
import styles from './Header.module.css';

function Header() {
  const cartTotalCount = useAppSelector(selectCartTotalCount);
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
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
              <img src={cartImg} alt="Cart" className={styles.icon} />
            </NavLink>
            {cartTotalCount > 0 && <span className={styles.coin}>{cartTotalCount}</span>}
          </li>
          <li>
            <button
              className={styles.themeButton}
              onClick={toggleTheme}
              style={{ backgroundColor: 'transparent' }}
            >
              {theme === 'light' ? (
                <img src={sunImg} alt="sun" className={styles.icon}></img>
              ) : (
                <img src={moonImg} alt="moon" className={styles.icon}></img>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
