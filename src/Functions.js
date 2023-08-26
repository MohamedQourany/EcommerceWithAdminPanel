import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  decrease,
  increaseQ,
  removeFromCart,
} from "./CounterSlice";
const Functions = () => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(calculateTotal());
  };

  const increaseItem = (productId) => {
    dispatch(increaseQ(productId));
    dispatch(calculateTotal());
  };

  const decreaseItem = (productId) => {
    dispatch(decrease(productId));
    dispatch(calculateTotal());
  };
  const total = useSelector((state) => state.cart.total);

  return {
    removeFromCartHandler,
    increaseItem,
    decreaseItem,
    total,
  };
};

export default Functions;
