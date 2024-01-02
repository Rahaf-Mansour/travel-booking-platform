import React from "react";
import PropTypes from "prop-types";
import { Star } from "@mui/icons-material";

const StarRating = ({ starsNumber, className, style }) => {
  const defaultStyles = {
    display: "flex",
  };

  const mergedStyles = { ...defaultStyles, ...style };

  return (
    <div className={className} style={mergedStyles}>
      {Array(starsNumber)
        .fill()
        .map((_, i) => (
          <Star key={i} sx={{ color: "#e6b219" }} />
        ))}
    </div>
  );
};

StarRating.propTypes = {
  starsNumber: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default StarRating;
