
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../features/products/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
  const { error: cartError } = useSelector((state) => state.cart);
  
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await dispatch(addItemToCart({ productId: product._id, quantity })).unwrap();
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setAdding(false);
    }
  };

  const increaseQty = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <section className={styles.details}>
        <div className={styles.loadingContainer}>
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </section>
    );
  }

  if (!loading && (error || !product)) {
    return (
      <section className={styles.details}>
        <div className={styles.errorContainer}>
          <h2>Product Not Found</h2>
          <p>{error || "The product you're looking for doesn't exist."}</p>
          <button onClick={() => navigate("/products")} className={styles.backBtn}>
            Back to Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.details}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate("/")} className={styles.breadcrumbLink}>Home</span>
        <span> / </span>
        <span onClick={() => navigate("/products")} className={styles.breadcrumbLink}>Products</span>
        <span> / {product.name}</span>
      </div>

      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.info}>
          <h1>{product.name}</h1>
          
          <div className={styles.rating}>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles.reviews}>(156 reviews)</span>
          </div>

          <p className={styles.price}>₹ {product.price.toLocaleString('en-IN')}</p>
          
          <p className={styles.description}>{product.description}</p>

          {addedToCart && (
            <div className={styles.successMessage}>
              ✓ Added to cart successfully!
            </div>
          )}

          {cartError && (
            <div className={styles.errorMessage}>
              ✗ {cartError}
            </div>
          )}

          <div className={styles.quantitySection}>
            <label htmlFor="quantity">Quantity:</label>
            <div className={styles.quantityControl}>
              <button
                className={styles.qtyBtn}
                onClick={decreaseQty}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 1);
                  setQuantity(val);
                }}
                className={styles.qtyInput}
              />
              <button className={styles.qtyBtn} onClick={increaseQty}>
                +
              </button>
            </div>
          </div>

          <button
            className={styles.cartBtn}
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? "Adding to Cart..." : "Add to Cart"}
          </button>

          <button
            onClick={() => navigate("/products")}
            className={styles.continueBtn}
          >
            Continue Shopping
          </button>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Free Shipping on Orders Above ₹500</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Authentic & Certified Jewelry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
