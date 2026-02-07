
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import styles from "./Products.module.css";

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <section className={styles.products}>
        <div className={styles.loadingContainer}>
          <div className="spinner"></div>
          <p style={{ marginLeft: "1rem" }}>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.products}>
        <h2 className={styles.title}>Our Collection</h2>
        <div className={styles.errorContainer}>
          <div>
            <h3>⚠️ Error</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                background: "var(--error-color)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.products}>
        <h2 className={styles.title}>Our Collection</h2>
        <div className={styles.emptyState}>
          <h3>No products available</h3>
          <p>Please check back later</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.products}>
      <h2 className={styles.title}>Our Collection</h2>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
