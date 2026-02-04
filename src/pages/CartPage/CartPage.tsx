import CartItem from '../../components/Cart/CartItem/CartItem';
import TotalPrice from '../../components/Cart/TotalPrice/TotalPrice';
import { useAppSelector } from '../../hooks/redux';
import { selectCartItems } from '../../store/selectors/cartSelectors';
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
      <TotalPrice></TotalPrice>
    </section>
  );
}

export default CartPage;
