import React from "react";
import HomeHeroBackground from "../../../../assets/images/HomeHeroBackground.jpg";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.imageContainer}>
      <h1 className={styles.overlayText}>
        Book with us for a happy,
        <br /> comfortable accommodation!
      </h1>
      <img
        src={HomeHeroBackground}
        className={styles.homeBackground}
        alt="HomeHeroBackground"
      />
    </div>
  );
};

export default HeroSection;
