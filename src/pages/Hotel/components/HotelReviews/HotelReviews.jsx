import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import CustomButton from "../../../../components/CustomButton";

const HotelReviews = ({ hotelGuestReviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  const sortedReviews = hotelGuestReviews.sort((a, b) => b.rating - a.rating);

  return (
    <div className={styles.hotelReviews}>
      <h3>What guests loved the most:</h3>
      {sortedReviews.slice(0, visibleReviews).map((review) => (
        <div className={styles.hotelReview} key={review.reviewId}>
          <div className={styles.reviewHeader}>
            <p className={styles.customerName}>{review.customerName}</p>
            <p className={styles.rating}>Rating: {review.rating}</p>
          </div>
          <p className={styles.description}>{review.description}</p>
        </div>
      ))}
      {visibleReviews < hotelGuestReviews.length && (
        <CustomButton className={styles.loadMore} onClick={loadMoreReviews}>
          Load More
        </CustomButton>
      )}
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
