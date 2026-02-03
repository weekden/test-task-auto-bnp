import type { CartItemType } from '../../types';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.product}>
        <img src={item.product.image} alt={item.product.title} className={styles.image} />
        <h3 className={styles.title}>{item.product.title}</h3>
      </div>

      <div className={styles.info}>
        <p className={styles.price}>${item.product.price.toFixed(2)}</p>

        <div className={styles.quantity}>
          <button>-</button>
          <span>{item.quantity}</span>
          <button>+</button>
        </div>

        <p className={styles.subtotal}>${(item.product.price * item.quantity).toFixed(2)}</p>

        <button className={styles.remove}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
