import React from "react";
import styles from "./Search.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Search = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroSearch}>
        <div className={styles.heroSearchItem}>
          <SingleBedIcon className={styles.heroIcon} />
          <input
            type="text"
            placeholder="Where are you going?"
            className={styles.heroSearchInput}
          />
        </div>
        <div className={styles.heroSearchItem}>{/* <DatePicker /> */}</div>
        <div className={styles.heroSearchItem}>
          <PersonOutlineIcon className={styles.heroIcon} />
          <span className={styles.heroSearchText}>
            2 adult . 0 children . 1 room
          </span>
        </div>
        <div>
          <button className={styles.heroSearchButton}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
