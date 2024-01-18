import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { searchAPI } from "../../../../services/searchService";
import { CircularProgress } from "@mui/material";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const params = Object.fromEntries([...searchParams]);
      try {
        const data = await searchAPI(params);
        setResults(data);
      } catch (err) {
        showErrorSnackbar("Whoops! Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchParams.toString()) {
      // Fetch only if there are search parameters
      fetchResults();
    }
  }, [searchParams]);

  const hotelData = results;

  return (
    <div className={styles.resultList}>
      {isLoading ? (
        <div className={styles.centered}>
          <CircularProgress />
        </div>
      ) : (
        hotelData.map((hotel) => (
          <Link
            to={`/hotel/${hotel.hotelId}`}
            key={hotel.hotelId}
            style={{ textDecoration: "none" }}
          >
            <SearchResultItem key={hotel.hotelId} hotel={hotel} />
          </Link>
        ))
      )}
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </div>
  );
};

export default SearchResult;
