import { useEffect, useState } from "react";
import styles from "./style.module.css";
import SearchResultItem from "../SearchResultItem";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { searchAPI } from "../../../../services/searchService";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";
import useLoading from "../../../../hooks/useLoading";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const [isLoading, stopLoading] = useLoading();

  useEffect(() => {
    const fetchResults = async () => {
      const params = Object.fromEntries([...searchParams]);
      try {
        const data = await searchAPI(params);
        setResults(data);
      } catch (error) {
        showErrorSnackbar(
          "Failed to fetch the results. Please try again later."
        );
      } finally {
        stopLoading();
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
      ) : hotelData.length > 0 ? (
        hotelData.map((hotel) => (
          <Link
            to={`/hotel/${hotel.hotelId}`}
            key={hotel.hotelId}
            style={{ textDecoration: "none" }}
          >
            <SearchResultItem key={hotel.hotelId} hotel={hotel} />
          </Link>
        ))
      ) : (
        <p className={styles.noHotelsMessage}>
          No hotels available for the selected criteria. Please refine your
          search parameters and try again.
        </p>
      )}
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </div>
  );
};

export default SearchResult;
