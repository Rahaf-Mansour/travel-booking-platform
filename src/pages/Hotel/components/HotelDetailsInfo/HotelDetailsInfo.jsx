import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import StarRating from "../../../../components/StarRating";

const HotelDetailsInfo = ({ hotelDetails }) => {
  const { hotelName, starRating, description } = hotelDetails;

  return (
    <div className={styles.hotelDetailsInfo}>
      <div className={styles.hotelHeader}>
        <h1 className={styles.hotelName}>{hotelName}</h1>
        <StarRating starsNumber={starRating} className={styles.starRating} />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default HotelDetailsInfo;

HotelDetailsInfo.propTypes = {
  hotelDetails: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    starRating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
