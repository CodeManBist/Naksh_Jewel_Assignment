import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateItem, removeItem, clearMessage } from "../features/cart/cartSlice";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, loading, error, message } = useSelector((state) => state.cart);
  const [updating, setUpdating] = useState(null);

  // Load cart only once
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Auto clear success message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const increase = async (productId, qty) => {
    try {
      setUpdating(productId);
      await dispatch(updateItem({ productId, quantity: qty + 1 })).unwrap();
    } finally {
      setUpdating(null);
    }
  };

  const decrease = async (productId, qty) => {
    if (qty <= 1) return;
    try {
      setUpdating(productId);
      await dispatch(updateItem({ productId, quantity: qty - 1 })).unwrap();
    } finally {
      setUpdating(null);
    }
  };

  const remove = async (productId) => {
    try {
      setUpdating(productId);
      await dispatch(removeItem(productId)).unwrap();
    } finally {
      setUpdating(null);
    }
  };

  return (
    <section className={styles.cart}>

      {/* ⭐ GLOBAL MESSAGE — always visible */}
      {message && (
        <div className={styles.globalMessage}>
          {message}
        </div>
      )}

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchCart())} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items yet</p>
          <Link to="/products" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.cartContainer}>
          <div className={styles.cartContent}>
            <h1>Your Cart</h1>

            <div className={styles.items}>
              {items.map((item) => (
                <div key={item._id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>

                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      ₹ {item.priceAtTime.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => decrease(item.productId, item.quantity)}
                      disabled={updating === item.productId}
                      className={styles.qtyBtn}
                    >
                      −
                    </button>

                    <span className={styles.qty}>{item.quantity}</span>

                    <button
                      onClick={() => increase(item.productId, item.quantity)}
                      disabled={updating === item.productId}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    <p className={styles.totalLabel}>Subtotal</p>
                    <p className={styles.totalAmount}>
                      ₹ {(item.priceAtTime * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => remove(item.productId)}
                    disabled={updating === item.productId}
                    className={styles.removeBtn}
                  >
                    {updating === item.productId ? "..." : "Remove"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cartSummary}>
            <h3>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Subtotal ({items.length} items)</span>
              <span>₹ {totalAmount.toLocaleString("en-IN")}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className={styles.divider}></div>

            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>₹ {totalAmount.toLocaleString("en-IN")}</span>
            </div>

            <Link to="/products" className={styles.continueLink}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
