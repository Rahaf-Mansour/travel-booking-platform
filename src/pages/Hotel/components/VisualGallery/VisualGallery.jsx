import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CloseIcon from "@mui/icons-material/Close";

const VisualGallery = ({ hotelGallery }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openFullscreen = (image) => {
    setSelectedImage(image);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.visualGallery}>
      <div className={styles.thumbnailContainer}>
        {hotelGallery.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Gallery ${image.id}`}
            onClick={() => openFullscreen(image)}
            className={styles.thumbnail}
          />
        ))}
      </div>

      {selectedImage && (
        <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
          <button onClick={closeFullscreen} className={styles.closeButton}>
            <CloseIcon />
          </button>
          <img
            src={selectedImage.url}
            alt={`Gallery ${selectedImage.id}`}
            className={styles.fullscreenImage}
          />
        </div>
      )}
    </div>
  );
};

export default VisualGallery;

VisualGallery.propTypes = {
  hotelGallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};
