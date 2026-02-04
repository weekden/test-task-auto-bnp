import { useAppSelector } from '../../../hooks/redux';
import { selectCartTotalPrice } from '../../../store/selectors/cartSelectors';
import styles from './TotalPrice.module.css';

function TotalPrice() {
  const totalPrice = useAppSelector(selectCartTotalPrice);
  return (
    <div className={styles.total}>
      <span className={styles.label}>Total:</span>
      <span className={styles.value}>${totalPrice.toFixed(2)}</span>
    </div>
  );
}
export default TotalPrice;
