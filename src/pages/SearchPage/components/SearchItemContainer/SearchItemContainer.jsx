import PropTypes from "prop-types";
import styles from "./style.module.css";

const SearchItemContainer = ({ children }) => {
  return <div className={styles.heroSearchItem}>{children}</div>;
};

SearchItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchItemContainer;
