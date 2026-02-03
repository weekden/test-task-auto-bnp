import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/cartSlice';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const addProductToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price}</p>
      <p className={styles.description}>{product.description}</p>
      <button disabled={product.rating.count === 0} onClick={addProductToCart}>
        Add to cart
      </button>
      <span
        className={`${styles.count} ${
          product.rating.count === 0 ? styles.outOfStock : styles.inStock
        }`}
      >
        {product.rating.count === 0 ? 'not available' : ' in stock '}
      </span>
    </div>
  );
}

export default ProductCard;
