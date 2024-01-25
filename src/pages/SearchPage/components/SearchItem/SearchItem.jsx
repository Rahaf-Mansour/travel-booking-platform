import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const SearchItem = ({ children }) => {
  return <div className={styles.heroSearchItem}>{children}</div>;
};

SearchItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchItem;
