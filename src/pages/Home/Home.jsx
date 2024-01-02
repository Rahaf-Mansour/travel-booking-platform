import React from "react";
import NavBar from "../../components/NavBar";
import HeroSection from "./components/HeroSection";
import Search from "../SearchPage/components/Search";
// import FeaturedDeals from "./components/FeaturedDeals";
import styles from "./style.module.css";
import Deals from "./components/FeaturedDeals/Deals";
import TrendingDestinations from "./components/TrendingDestinations";
import RecentlyVisitedHotels from "./components/RecentlyVisitedHotels";

const Home = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <Search topXs="30px" topLg="-33px" />
      <div className={styles.container}>
        {/* <FeaturedDeals />
        <FeaturedDeals /> */}
        <Deals />
        <TrendingDestinations />
        <RecentlyVisitedHotels />
      </div>
    </>
  );
};

export default Home;
