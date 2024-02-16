import { CircularProgress } from "@mui/material";
import styles from "./style.module.css";
import PropTypes from "prop-types";

const CircularProgressIndicator = ({ isLoading }) => {
  return (
    <div className={styles.centered}>{isLoading && <CircularProgress />}</div>
  );
};

export default CircularProgressIndicator;

CircularProgressIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
