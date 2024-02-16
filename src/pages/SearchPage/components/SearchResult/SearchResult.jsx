import { useEffect, useState } from "react";
import styles from "./style.module.css";
import SearchResultItem from "../SearchResultItem";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { searchAPI } from "../../../../services/searchService";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import PropTypes from "prop-types";
import useComponentLoader from "../../../../hooks/useComponentLoader";

const SearchResult = ({ filters }) => {
  const [searchParams] = useSearchParams();
  const [initialResults, setInitialResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const { isLoading, stopLoading } = useComponentLoader();

  useEffect(() => {
    const fetchResults = async () => {
      const params = Object.fromEntries([...searchParams]);
      try {
        const fetchResultsData = await searchAPI(params);
        setInitialResults(fetchResultsData);
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

  useEffect(() => {
    const applyFiltersAndSort = () => {
      const filteredResults = initialResults.filter((item) => {
        if (
          filters.starRating &&
          item.starRating !== parseInt(filters.starRating)
        ) {
          return false;
        }

        if (filters.roomType && item.roomType !== filters.roomType) {
          return false;
        }

        if (
          filters.priceRange &&
          (item.roomPrice < filters.priceRange[0] ||
            item.roomPrice > filters.priceRange[1])
        ) {
          return false;
        }

        if (
          filters.amenities &&
          filters.amenities.length > 0 &&
          !filters.amenities.some((filterAmenity) =>
            item.amenities.some((amenity) => amenity.name === filterAmenity)
          )
        ) {
          return false;
        }

        return true;
      });

      if (filters.sort) {
        filteredResults.sort((a, b) =>
          filters.sort === "Price"
            ? a.roomPrice - b.roomPrice
            : b.starRating - a.starRating
        );
      }

      setFinalResults(filteredResults);
    };

    applyFiltersAndSort();
  }, [filters, initialResults]);

  return (
    <div className={styles.resultList}>
      {finalResults.length > 0
        ? finalResults.map((hotel) => (
            <Link
              to={`/hotel/${hotel.hotelId}`}
              key={hotel.hotelId}
              style={{ textDecoration: "none" }}
            >
              <SearchResultItem key={hotel.hotelId} hotel={hotel} />
            </Link>
          ))
        : !isLoading && (
            <p className={styles.noHotelsMessage}>
              No hotels available for the selected criteria. Please refine your
              search parameters and try again.
            </p>
          )}

      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
      {isLoading && <p>loading...</p>}
    </div>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  filters: PropTypes.shape({
    starRating: PropTypes.number,
    roomType: PropTypes.string,
    roomPrice: PropTypes.number,
    priceRange: PropTypes.arrayOf(PropTypes.number),
    sort: PropTypes.string,
    amenities: PropTypes.arrayOf(PropTypes.string),
  }),
};
