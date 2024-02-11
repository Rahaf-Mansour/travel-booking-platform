import PropTypes from "prop-types";
import styles from "./style.module.css";
import StarRating from "../../../../components/StarRating";

const HotelHeaderAndDescription = ({ hotelName, starRating, description }) => {
  return (
    <div className={styles.hotelHeaderAndDescriptionContainer}>
      <div className={styles.hotelHeader}>
        <h1 className={styles.hotelName}>{hotelName}</h1>
        <StarRating starsNumber={starRating} />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default HotelHeaderAndDescription;

HotelHeaderAndDescription.propTypes = {
  hotelName: PropTypes.string.isRequired,
  starRating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
