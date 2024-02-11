import HomeHeroBackground from "../../../../assets/images/HomeHeroBackground.jpg";
import styles from "./style.module.css";

const HeroSection = () => {
  return (
    <header className={styles.imageContainer}>
      <h1 className={styles.overlayText}>
        Book with us for a happy,
        <br /> comfortable accommodation!
      </h1>
      <img
        src={HomeHeroBackground}
        className={styles.homeBackground}
        alt="HomeHeroBackground"
      />
    </header>
  );
};

export default HeroSection;
