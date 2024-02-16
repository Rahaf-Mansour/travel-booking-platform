import { useState, useEffect } from "react";
import { recentlyVisitedHotelsAPI } from "../../../../services/homePageServices";
import useValueFromToken from "../../../../hooks/useValueFromToken";
import useSnackbar from "../../../../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import RecentlyVisitedHotelsWithLoading from "./RecentlyVisitedHotelsWithLoading";
import useComponentLoader from "../../../../hooks/useComponentLoader";

export const RecentlyVisitedHotels = () => {
  const { isLoading, stopLoading } = useComponentLoader();
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const [recentHotels, setRecentHotels] = useState([]);

  const userId = useValueFromToken("user_id");
  const navigate = useNavigate();

  const handleFetchRecentlyVisitedHotels = async () => {
    try {
      const recentHotelsData = await recentlyVisitedHotelsAPI(userId);
      setRecentHotels(recentHotelsData);
    } catch (error) {
      showErrorSnackbar(
        "Failed to fetch recently visited hotels. Please try again later."
      );
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    handleFetchRecentlyVisitedHotels();
  }, []);

  const handleNavigation = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  const lastVisitedHotels = recentHotels.slice(1, 5);

  return (
    <RecentlyVisitedHotelsWithLoading
      isLoading={isLoading}
      lastVisitedHotels={lastVisitedHotels}
      handleNavigation={handleNavigation}
      snackbar={snackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
};

export default RecentlyVisitedHotels;
