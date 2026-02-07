import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        
        <Link to="/" className={styles.homeBtn}>
          Back to Home
        </Link>

        <div className={styles.suggestions}>
          <p>Here are some helpful links:</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

