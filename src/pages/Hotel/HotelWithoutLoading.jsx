import Footer from "../../components/Footer";
import HotelDetails from "./components/HotelDetails";
import HotelMapLocation from "./components/HotelMapLocation";
import AvailableRooms from "./components/AvailableRooms";
import VisualGallery from "./components/VisualGallery";
import GenericSnackbar from "../../components/GenericSnackbar";
import styles from "./style.module.css";
import PropTypes from "prop-types";

const HotelWithoutLoading = ({
  hotelDetails,
  hotelGallery,
  hotelAvailableRooms,
  hotelGuestReviews,
  error,
  snackbar,
  handleCloseSnackbar,
}) => {
  return (
    <>
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

      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};

export default HotelWithoutLoading;

HotelWithoutLoading.propTypes = {
  hotelDetails: PropTypes.object,
  hotelGallery: PropTypes.array,
  hotelAvailableRooms: PropTypes.array,
  hotelGuestReviews: PropTypes.array,
  error: PropTypes.string,
  snackbar: PropTypes.object.isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
};
