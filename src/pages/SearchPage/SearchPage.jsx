import React from "react";
import Search from "./components/Search";
import NavBar from "../../components/NavBar";

const SearchPage = () => {
  return (
    <div>
      <NavBar />
      <Search position="fixed" topXs="80px" />
    </div>
  );
};

export default SearchPage;
