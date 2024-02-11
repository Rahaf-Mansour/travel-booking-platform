import styles from "./style.module.css";
import StarRating from "../../../../components/StarRating";
import { useNavigate } from "react-router-dom";
import { getHotelDetails } from "../../../../services/hotelPageServices";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";

const DealCard = ({ deal }) => {
  const {
    hotelId,
    roomPhotoUrl,
    hotelName,
    cityName,
    hotelStarRating,
    originalRoomPrice,
    finalPrice,
  } = deal;

  const navigate = useNavigate();

  const handleDealClick = async () => {
    try {
      await getHotelDetails(hotelId);
      navigate(`/hotel/${hotelId}`);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  return (
    <div onClick={handleDealClick} className={styles.dealCard}>
      <img className={styles.roomPhoto} src={roomPhotoUrl} alt={hotelName} />
      <div className={styles.bottomContainer}>
        <div className={styles.topSpaceBetweenContainer}>
          <h3 className={styles.hotelName}>{hotelName}</h3>
          <StarRating starsNumber={hotelStarRating} />
        </div>
        <div className={styles.bottomSpaceBetweenContainer}>
          <p className={styles.cityName}>
            <LocationOnIcon
              sx={{ color: "#3d3737", fontSize: "1.2rem", marginRight: 0.5 }}
            />
            {cityName}
          </p>
          <div className={styles.priceInfoContainer}>
            <p className={styles.originalPrice}>${originalRoomPrice}</p>
            <p className={styles.finalPrice}>${finalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;

DealCard.propTypes = {
  deal: PropTypes.shape({
    hotelId: PropTypes.number.isRequired,
    roomPhotoUrl: PropTypes.string.isRequired,
    hotelName: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    hotelStarRating: PropTypes.number.isRequired,
    originalRoomPrice: PropTypes.number.isRequired,
    finalPrice: PropTypes.number.isRequired,
  }).isRequired,
};
