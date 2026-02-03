import { useAppSelector } from '../../hooks/redux';
import { selectCartItems } from '../../store/selectors';

function CartPage() {
  const items = useAppSelector(selectCartItems);
  console.log(items);
  return <h1>Cart Page</h1>;
}

export default CartPage;
