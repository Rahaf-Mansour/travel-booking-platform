import React, { useEffect, useContext } from "react";
import styles from "./style.module.css";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import SearchFilters from "../SearchFilters";
import { SearchContext } from "../../../../context/searchContext";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const { callSearchAPI, searchData } = useContext(SearchContext);

  useEffect(() => {
    callSearchAPI();
  }, []);

  const hotelData = searchData;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SearchFilters />
        <div className={styles.resultList}>
          {hotelData.map((hotel) => (
            <Link
              to={`/hotel/${hotel.hotelId}`}
              key={hotel.hotelId}
              style={{ textDecoration: "none" }}
            >
              <SearchResultItem key={hotel.hotelId} hotel={hotel} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
