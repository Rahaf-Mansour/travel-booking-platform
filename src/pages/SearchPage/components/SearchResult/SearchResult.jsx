import { useEffect, useState } from "react";
import styles from "./style.module.css";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { searchAPI } from "../../../../services/searchService";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";
import { useLoading } from "../../../../context/LoadingContext";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useLoading();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const params = Object.fromEntries([...searchParams]);
      try {
        const data = await searchAPI(params);
        setResults(data);
      } catch (error) {
        showErrorSnackbar(
          "Whoops! Something went wrong when fetching the result."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (searchParams.toString()) {
      fetchResults();
    }
  }, [searchParams]);

  const hotelData = results;

  return (
    <div className={styles.resultList}>
      {isLoading ? (
        <CircularProgressIndicator />
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
