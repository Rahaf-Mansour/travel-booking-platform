import PropTypes from "prop-types";
import { Star } from "@mui/icons-material";

const StarRating = ({ starsNumber, className }) => {
  return (
    <div className={className} style={{ display: "flex" }}>
      {Array(starsNumber)
        .fill()
        .map((_, i) => (
          <Star key={i} sx={{ color: "#e6b219" }} />
        ))}
    </div>
  );
};

export default StarRating;

StarRating.propTypes = {
  starsNumber: PropTypes.number.isRequired,
  className: PropTypes.string,
};
