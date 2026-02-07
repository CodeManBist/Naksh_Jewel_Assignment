import Hero from "../components/Hero";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.home}>
      <Hero />
    </main>
  );
};

export default Home;
