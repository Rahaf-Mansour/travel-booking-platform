import React from "react";
import styles from "./Search.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchItem from "../SearchItem";
import DateCheck from "../../../Home/components/DateCheck";
import OptionItem from "../OptionItem";
import CustomButton from "../../../../components/CustomButton";
import { NavLink } from "react-router-dom";

const Search = () => {
  const initialState = {
    adults: 2,
    children: 0,
    room: 1,
  };

  const [isOptionsOpened, setIsOptionsOpened] = React.useState(false);
  const [options, setOptions] = React.useState(initialState);

  const handleIncrement = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: prevOptions[option] + 1,
    }));
  };

  const handleDecrement = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: prevOptions[option] - 1,
    }));
  };

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
          <DateCheck />
        </SearchItem>
        <SearchItem>
          <CustomButton
            className={styles.heroSearchText}
            onClick={() => setIsOptionsOpened(!isOptionsOpened)}
          >
            <PersonOutlineIcon className={styles.heroIcon} />
            <span>
              {`${options.adults} adult . ${options.children} children . ${options.room} room`}
            </span>
          </CustomButton>
          {isOptionsOpened && (
            <div className={styles.options}>
              <OptionItem
                label="Adults"
                count={options.adults}
                min={1}
                onIncrement={() => handleIncrement("adults")}
                onDecrement={() => handleDecrement("adults")}
              />
              <OptionItem
                label="Children"
                count={options.children}
                onIncrement={() => handleIncrement("children")}
                onDecrement={() => handleDecrement("children")}
              />
              <OptionItem
                label="Rooms"
                count={options.room}
                min={1}
                onIncrement={() => handleIncrement("room")}
                onDecrement={() => handleDecrement("room")}
              />
            </div>
          )}
        </SearchItem>
        <SearchItem>
          <CustomButton className={styles.heroSearchButton}>
            <NavLink to="/hotel">Search</NavLink>
          </CustomButton>
        </SearchItem>
      </div>
    </div>
  );
};

export default Search;
