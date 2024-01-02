import React from "react";
import SearchBar from "./components/SearchBar";
import NavBar from "../../components/NavBar";
import SearchResult from "./components/SearchResult";
import SearchContextProvider from "../../context/searchContext";
import styles from "./style.module.css";
import SearchFilters from "./components/SearchFilters";

const SearchPage = () => {
  return (
    <div>
      <NavBar />
      <SearchBar topXs="30px" topLg="30px" />
      <SearchContextProvider>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <SearchFilters />
            <SearchResult />
          </div>
        </div>
      </SearchContextProvider>
    </div>
  );
};

export default SearchPage;
