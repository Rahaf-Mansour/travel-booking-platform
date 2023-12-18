import React from "react";
import styles from "./Search.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SearchItem from "../SearchItem";
import DateRange from "../DateRange";

const Search = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroSearch}>
        <SearchItem>
          <SingleBedIcon className={styles.heroIcon} />
          <input
            type="text"
            placeholder="Where are you going?"
            className={styles.heroSearchInput}
          />
        </SearchItem>
        <SearchItem>
          <DateRangeIcon className={styles.heroIcon} />
          <DateRange />
        </SearchItem>
        <SearchItem>
          <PersonOutlineIcon className={styles.heroIcon} />
          <span className={styles.heroSearchText}>
            2 adult . 0 children . 1 room
          </span>
        </SearchItem>
        <SearchItem>
          <button className={styles.heroSearchButton}>Search</button>
        </SearchItem>
      </div>
    </div>
  );
};

export default Search;
