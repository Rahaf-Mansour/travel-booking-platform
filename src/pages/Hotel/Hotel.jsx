import { useEffect, useContext } from "react";
import { useHotelData } from "./hooks/useHotelData";
import useSnackbar from "../../hooks/useSnackbar";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import HotelWithLoading from "./HotelWithLoading";
import NavBar from "../../components/NavBar";

const Hotel = () => {
  const { hotelId } = useParams();
  const { searchParams } = useContext(SearchContext);
  const { checkInDate, checkOutDate } = searchParams;
  const isThereDates = checkInDate !== null && checkOutDate !== null;

  const {
    hotelDetails,
    hotelGuestReviews,
    hotelGallery,
    hotelAvailableRooms,
    isLoading,
    error,
  } = useHotelData(hotelId, isThereDates, checkInDate, checkOutDate);

  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      showErrorSnackbar(error);
    }
  }, [error]);

  return (
    <>
      <NavBar />

      <HotelWithLoading
        isLoading={isLoading}
        hotelDetails={hotelDetails}
        hotelGuestReviews={hotelGuestReviews}
        hotelGallery={hotelGallery}
        hotelAvailableRooms={hotelAvailableRooms}
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </>
  );
};

export default Hotel;
