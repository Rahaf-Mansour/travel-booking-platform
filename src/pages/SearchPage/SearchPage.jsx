import React from "react";
import SearchBar from "./components/SearchBar";
import NavBar from "../../components/NavBar";
import SearchResult from "./components/SearchResult";
import styles from "./style.module.css";
import SearchFilters from "./components/SearchFilters";
import Footer from "../../components/Footer";

const SearchPage = () => {
  return (
    <div>
      <NavBar />
      <SearchBar topXs="30px" topLg="30px" />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <SearchFilters />
          <SearchResult />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
