import React from "react";
import NavBar from "../../components/NavBar";
import HeroSection from "./components/HeroSection";
import Search from "../SearchPage/components/Search";

const Home = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Search />
    </div>
  );
};

export default Home;
