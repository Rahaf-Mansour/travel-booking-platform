import SearchBar from "./components/SearchBar";
import NavBar from "../../components/NavBar";
import SearchResult from "./components/SearchResult";
import styles from "./style.module.css";
import SearchFilters from "./components/SearchFilters";
import Footer from "../../components/Footer";
import { useState } from "react";

const SearchPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <NavBar />
      <SearchBar topXs="30px" topLg="30px" />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <SearchFilters onFilter={handleFilter} />
          <SearchResult filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
