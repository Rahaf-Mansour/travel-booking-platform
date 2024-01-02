import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CustomButton from "../../../../components/CustomButton";
import PersonIcon from "@mui/icons-material/Person";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { renderAmenityIcon } from "./helpers/helpers";

const AvailableRooms = ({ hotelAvailableRooms }) => {
  if (hotelAvailableRooms.length === 0) {
    return <p>No rooms available.</p>;
  }

  const handleAddToCart = () => {
    console.log("Added to cart");
  };

  const availableRooms = hotelAvailableRooms.filter(
    (room) => room.availability
  );

  return (
    <>
      <h3 className={styles.header}>Available Rooms</h3>

      <div className={styles.availableRoomsContainer}>
        {availableRooms.map((room, index) => (
          <div key={index} className={styles.roomCard}>
            <img
              src={room.roomPhotoUrl}
              alt={`Photo of ${room.roomType} room`}
              className={styles.roomImage}
            />
            <div className={styles.roomHeader}>
              <p className={styles.roomType}>{room.roomType} Room</p>
              <p className={styles.availabilityAvailable}>Available</p>
            </div>

            <p className={styles.price}>Price: ${room.price}</p>
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
