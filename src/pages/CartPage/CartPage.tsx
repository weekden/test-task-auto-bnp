import CartItem from '../../components/CartItem/CartItem';
import { useAppSelector } from '../../hooks/redux';
import { selectCartItems } from '../../store/selectors';
import styles from './CartPage.module.css';

function CartPage() {
  const items = useAppSelector(selectCartItems);

  if (items.length === 0) {
    return <h2 className={styles.title}>Cart is empty</h2>;
  }

  return (
    <section className={styles.content}>
      <h2 className={styles.title}>Your Cart</h2>
      <ul className={styles.list}>
        {items.map((cartItem) => (
          <li key={cartItem.product.id}>
            <CartItem item={cartItem}></CartItem>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CartPage;
