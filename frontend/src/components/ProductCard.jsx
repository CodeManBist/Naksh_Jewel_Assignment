
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const localError = error; // Declare localError variable

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsAdding(true);
      setError(null);
      await dispatch(addItemToCart({ productId: product._id, quantity: 1 })).unwrap();
    } catch (err) {
      setError("Failed to add to cart");
      console.error("Add to cart error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product._id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          {product.image && (
            <img src={product.image || "/placeholder.svg"} alt={product.name} className={styles.image} />
          )}
          <div className={styles.overlay}>
            <button
              className={styles.viewBtn}
              onClick={handleCardClick}
            >
              View Details
            </button>
          </div>
        </div>
      </Link>

      <div className={styles.info}>
        <h3 title={product.name}>{product.name}</h3>
        <p className={styles.price}>₹ {product.price.toLocaleString('en-IN')}</p>
        
        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.cartBtn}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
