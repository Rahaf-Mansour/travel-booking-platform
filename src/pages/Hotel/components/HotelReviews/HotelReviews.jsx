import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CustomButton from "../../../../components/CustomButton";

const HotelReviews = ({ hotelGuestReviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
  };

  const loadLessReviews = () => {
    setVisibleReviews(3);
  };

  const sortedReviews = hotelGuestReviews
    .slice()
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className={styles.hotelReviews}>
      <h3>What guests loved the most:</h3>

      {sortedReviews.slice(0, visibleReviews).map((review) => (
        <div className={styles.hotelReview} key={review.reviewId}>
          <div className={styles.reviewHeader}>
            <p className={styles.customerName}> {review.customerName}</p>
            <p className={styles.rating}>Rating: {review.rating}</p>
          </div>
          <p className={styles.description}>{review.description}</p>
        </div>
      ))}

      <div className={styles.centerButton}>
        <CustomButton
          className={styles.loadButton}
          onClick={
            visibleReviews < hotelGuestReviews.length
              ? loadMoreReviews
              : loadLessReviews
          }
        >
          {visibleReviews < hotelGuestReviews.length
            ? "Load More"
            : "Load Less"}
        </CustomButton>
      </div>
    </div>
  );
};

export default HotelReviews;

HotelReviews.propTypes = {
  hotelGuestReviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviewId: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
