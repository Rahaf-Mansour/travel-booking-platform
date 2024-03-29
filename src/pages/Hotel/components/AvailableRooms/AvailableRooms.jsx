import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CustomButton from "../../../../components/CustomButton";
import PersonIcon from "@mui/icons-material/Person";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { renderAmenityIcon } from "../../../../helpers/helpers";
import useCartContext from "../../../../hooks/useCartContext";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import { SearchContext } from "../../../../context/searchContext";

const AvailableRooms = ({ hotelAvailableRooms }) => {
  const { addToCart, isRoomAlreadyInCart } = useCartContext();
  const { snackbar, showSuccessSnackbar, handleCloseSnackbar, showSnackbar } =
    useSnackbar();
  const { checkInDate, checkOutDate } = useContext(SearchContext);

  useEffect(() => {
    hotelAvailableRooms &&
      hotelAvailableRooms.length === 0 &&
      showSnackbar(
        `There are no available rooms between ${checkInDate} and ${checkOutDate}.`,
        "info"
      );
  }, [hotelAvailableRooms, checkInDate, checkOutDate]);

  const handleAddToCart = (room) => {
    if (!isRoomAlreadyInCart(room.roomId)) {
      addToCart(room);
      showSuccessSnackbar(`${room.roomType} Room Added to cart!`);
    }
  };

  const availableRooms = hotelAvailableRooms.filter(
    (room) => room.availability
  );

  return (
    <>
      <h3 className={styles.header}>Available Rooms</h3>
      {hotelAvailableRooms && hotelAvailableRooms.length === 0 && (
        <>
          <p className={styles.warningInfoParagraph}>
            {`There are no available rooms between ${checkInDate} and ${checkOutDate}.`}
          </p>
        </>
      )}

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
              <p className={styles.price}>${room.price}/night</p>
            </div>

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
              className={`${styles.addButtonCommon} ${
                isRoomAlreadyInCart(room.roomId)
                  ? styles.addedButton
                  : styles.addCartButton
              }`}
              onClick={() => handleAddToCart(room)}
            >
              {isRoomAlreadyInCart(room.roomId) ? "Added!" : "Add to Cart"}
              {!isRoomAlreadyInCart(room.roomId) && (
                <AddShoppingCartIcon sx={{ fontSize: "1.3rem" }} />
              )}
            </CustomButton>
          </div>
        ))}
      </div>

      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
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
