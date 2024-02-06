import PropTypes from "prop-types";
import HotelDetailsInfo from "../HotelDetailsInfo";
import HotelReviews from "../HotelReviews";
import HotelAmenities from "../HotelAmenities";

const HotelDetails = ({ hotelDetails, hotelGuestReviews }) => {
  if ({ hotelDetails }.length === 0 || hotelGuestReviews.length === 0) {
    return <p>No Data available.</p>;
  }

  return (
    <div>
      <HotelDetailsInfo hotelDetails={hotelDetails} />
      <HotelAmenities amenities={hotelDetails.amenities} />
      <HotelReviews hotelGuestReviews={hotelGuestReviews} />
    </div>
  );
};

export default HotelDetails;

HotelDetails.propTypes = {
  hotelDetails: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    starRating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
  }),
  hotelGuestReviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviewId: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
