import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      Home page
      <Link to="search">Search</Link>
    </div>
  );
};

export default Home;
