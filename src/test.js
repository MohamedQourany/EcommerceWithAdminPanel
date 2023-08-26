const [products, setProducts] = useState([]);
const cart = useSelector((state) => state.cart);

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const addToCart = (product) => {
  dispatch(addItem(product));
  dispatch(calculateTotal());
};

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

useEffect(() => {
  fetchProducts();
}, []);
