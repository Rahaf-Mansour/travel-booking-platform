import { useEffect, useContext } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CircularProgressIndicator from "../../components/CircularProgressIndicator";
import { useHotelData } from "./hooks/useHotelData";
import HotelDetails from "./components/HotelDetails";
import HotelMapLocation from "./components/HotelMapLocation";
import AvailableRooms from "./components/AvailableRooms";
import VisualGallery from "./components/VisualGallery";
import GenericSnackbar from "../../components/GenericSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import styles from "./style.module.css";

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
      {hotelDetails && (
        <div>
          {error && (
            <p className={styles.errorMessage}>
              Failed to fetch. please try again later.
            </p>
          )}

          <div className={styles.container}>
            <div className={styles.hotelDetailsAndMapContainer}>
              <HotelDetails
                hotelDetails={hotelDetails}
                hotelGuestReviews={hotelGuestReviews}
              />
              {hotelDetails && (
                <HotelMapLocation
                  latitude={hotelDetails.latitude}
                  longitude={hotelDetails.longitude}
                  hotelName={hotelDetails.hotelName}
                  location={hotelDetails.location}
                />
              )}
            </div>

            <div className={styles.galleryAndRoomsContainer}>
              <VisualGallery hotelGallery={hotelGallery} />
              <AvailableRooms hotelAvailableRooms={hotelAvailableRooms} />
            </div>
          </div>
          <Footer />
        </div>
      )}

      <CircularProgressIndicator isLoading={isLoading} />
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};

export default Hotel;
