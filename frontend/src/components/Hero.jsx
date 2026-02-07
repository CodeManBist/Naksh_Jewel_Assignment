import React from 'react'
import styles from "./Hero.module.css";
import heroImg from "../assets/hero.webp"

const Hero = () => {
  return (
    <section className={styles.hero}>
        <img src={heroImg} alt="hero image" className={styles.hero_img} />

        <div className={styles.overlay}></div>

        <div className={styles.hero_text}>
            <h3>Wear the Sparkle You Deserve</h3>
            <p>
              From everyday elegance to special moments, our jewelry adds a touch of brilliance to your style and memories.
            </p>
            <button className={styles.cta}>Explore Collection</button>
        </div>
    </section>
  )
}

export default Hero
