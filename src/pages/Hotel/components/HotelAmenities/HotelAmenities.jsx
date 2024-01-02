import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const HotelAmenities = ({ amenities }) => {
  return (
    <div className={styles.hotelAmenities}>
      <h3>Amenities</h3>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index} className={styles.amenityItem}>
            <CheckCircleIcon sx={{ color: "green" }} />
            <strong>{amenity.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

HotelAmenities.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default HotelAmenities;
