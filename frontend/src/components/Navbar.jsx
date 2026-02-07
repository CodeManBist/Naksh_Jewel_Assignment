import React from 'react'
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className={styles.logo}>
          <Link to="/">Jewels</Link>
        </div>
        <div className={styles.nav_links}>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
        </div>
    </nav>
    </header>
  )
}

export default Navbar
