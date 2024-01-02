import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CustomButton from "../../../../components/CustomButton";
import PersonIcon from "@mui/icons-material/Person";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const AvailableRooms = ({ hotelAvailableRooms }) => {
  if (hotelAvailableRooms.length === 0) {
    return <p>No rooms available.</p>;
  }

  const handleAddToCart = () => {
    console.log("Added to cart");
  };

  return (
    <>
      <h3 className={styles.header}>Available Rooms</h3>
      <div className={styles.availableRoomsContainer}>
        {hotelAvailableRooms.map((room, index) => (
          <div key={index} className={styles.roomCard}>
            <img
              src={room.roomPhotoUrl}
              alt={`Photo of ${room.roomType} room`}
              className={styles.roomImage}
            />
            <p className={styles.roomType}>Room Type: {room.roomType}</p>
            <p className={styles.price}>Price: ${room.price}</p>
            <p
              className={
                room.availability
                  ? styles.availabilityAvailable
                  : styles.availabilityNotAvailable
              }
            >
              {room.availability ? "Available" : "Not Available"}
            </p>
            <div className={styles.capacityInfo}>
              <div className={styles.iconContainer}>
                <PersonIcon fontSize="small" />
              </div>
              <p>Adults: {room.capacityOfAdults}</p>
            </div>
            <div className={styles.capacityInfo}>
              <div className={styles.iconContainer}>
                <ChildFriendlyIcon fontSize="small" />
              </div>
              <p>Children: {room.capacityOfChildren}</p>
            </div>
            <div className={styles.amenities}>
              <ul>
                {room.roomAmenities.map((amenity, amenityIndex) => (
                  <li key={amenityIndex}>
                    {renderAmenityIcon(amenity.name)} {amenity.name}:{" "}
                    {amenity.description}
                  </li>
                ))}
              </ul>
            </div>

            <CustomButton
              className={styles.addCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
              <AddShoppingCartIcon sx={{ fontSize: "1.3rem" }} />
            </CustomButton>
          </div>
        ))}
      </div>
    </>
  );
};

const renderAmenityIcon = (amenityName) => {
  switch (amenityName.toLowerCase()) {
    case "free wi-fi":
      return <WifiIcon fontSize="small" />;
    case "tv":
      return <TvIcon fontSize="small" />;
    case "air conditioning":
      return <AcUnitIcon fontSize="small" />;
    default:
      return null;
  }
};

export default AvailableRooms;

AvailableRooms.propTypes = {
  hotelAvailableRooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomType: PropTypes.string.isRequired,
      roomPhotoUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      availability: PropTypes.bool.isRequired,
      capacityOfAdults: PropTypes.number.isRequired,
      capacityOfChildren: PropTypes.number.isRequired,
      roomAmenities: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
};
