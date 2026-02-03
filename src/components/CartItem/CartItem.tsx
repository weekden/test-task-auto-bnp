import { useAppDispatch } from '../../hooks/redux';
import { decreaseQuantity, increaseQuantity, removeItemFromCart } from '../../store/cartSlice';
import type { CartItemType } from '../../types';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.item}>
      <div className={styles.product}>
        <img src={item.product.image} alt={item.product.title} className={styles.image} />
        <h3 className={styles.title}>{item.product.title}</h3>
      </div>

      <div className={styles.info}>
        <p className={styles.price}>${item.product.price.toFixed(2)}</p>

        <div className={styles.quantity}>
          <button
            disabled={item.quantity === 1}
            onClick={() => dispatch(decreaseQuantity(item.product.id))}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity(item.product.id))}>+</button>
        </div>

        <p className={styles.subtotal}>${(item.product.price * item.quantity).toFixed(2)}</p>

        <button
          className={styles.remove}
          onClick={() => dispatch(removeItemFromCart(item.product.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
