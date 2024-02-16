import NavBar from "../../components/NavBar";
import HeroSection from "./components/HeroSection";
import SearchBar from "../SearchPage/components/SearchBar";
import FeaturedDeals from "./components/FeaturedDeals";
import styles from "./style.module.css";
import TrendingDestinations from "./components/TrendingDestinations";
import Footer from "../../components/Footer";
import RecentlyVisitedHotelsSection from "./components/RecentlyVisitedHotels/RecentlyVisitedHotelsSection";

const Home = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <SearchBar topXs="30px" topLg="-33px" />
      <div className={styles.container}>
        <FeaturedDeals />
        <TrendingDestinations />
        <RecentlyVisitedHotelsSection />
      </div>
      <Footer />
    </>
  );
};

export default Home;
