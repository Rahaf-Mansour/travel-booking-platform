import { useState, useEffect } from "react";
import { trendingDestinationsAPI } from "../../../../services/homePageServices";
import useComponentLoader from "../../../../hooks/useComponentLoader";
import useSnackbar from "../../../../hooks/useSnackbar";
import TrendingDestinationsWithLoading from "./TrendingDestinationsWithLoading";

export function TrendingDestinations() {
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const { isLoading, stopLoading } = useComponentLoader();
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  useEffect(() => {
    const handleFetchTrendingDestinations = async () => {
      try {
        const trendingDestinationsData = await trendingDestinationsAPI();
        setTrendingDestinations(trendingDestinationsData);
      } catch (error) {
        showErrorSnackbar(
          "Failed to fetch trending destinations. Please try again later."
        );
      } finally {
        stopLoading();
      }
    };

    handleFetchTrendingDestinations();
  }, []);

  return (
    <TrendingDestinationsWithLoading
      isLoading={isLoading}
      trendingDestinations={trendingDestinations}
      snackbar={snackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
}

export default TrendingDestinations;
