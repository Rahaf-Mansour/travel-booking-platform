import React from "react";
import styles from "./style.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchItem from "../SearchItem";
import DateCheck from "../../../Home/components/DateCheck";
import OptionItem from "../OptionItem";
import CustomButton from "../../../../components/CustomButton";
import GenericSnackbar from "../../../../components/GenericSnackbar/GenericSnackbar";
import PropTypes from "prop-types";
import { SearchContainer } from "./styles";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { searchAPI } from "../../../../services/searchService";
import { useNavigate } from "react-router-dom";

const Search = ({ position, topXs = "80px", topLg = "80px" }) => {
  const initialState = {
    adults: 2,
    children: 0,
    room: 1,
  };

  const [options, setOptions] = React.useState(initialState);
  const [isOptionsOpened, setIsOptionsOpened] = React.useState(false);
  const [isDateOpened, setIsDateOpened] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigateToSearchPage = useNavigate();

  const handleSetDate = (newDate) => {
    const formattedCheckInDate = dayjs(newDate.startDate).format("YYYY-MM-DD");
    const formattedCheckOutDate = dayjs(newDate.endDate).format("YYYY-MM-DD");

    formik.setFieldValue("checkInDate", formattedCheckInDate);
    formik.setFieldValue("checkOutDate", formattedCheckOutDate);
    console.log("Updated dates:", formattedCheckInDate, formattedCheckOutDate);
  };

  const handleIncrement = (option) => {
    formik.setFieldValue(option, options[option] + 1);
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: prevOptions[option] + 1,
    }));
  };

  const handleDecrement = (option) => {
    formik.setFieldValue(option, options[option] - 1);
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: prevOptions[option] - 1,
    }));
  };

  const handleSearch = async (values) => {
    try {
      setIsSearching(true);
      const response = await searchAPI(values);
      console.log("Response:", response);
      setIsOptionsOpened(false);
      setIsDateOpened(false);
      navigateToSearchPage("/search");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Search failed! Unable to search with provided details.",
        severity: "error",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      city: "",
      checkInDate: dayjs().format("YYYY-MM-DD"),
      checkOutDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
      adults: 2,
      children: 0,
      room: 1,
    },
    onSubmit: handleSearch,
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className={styles.hero}>
        <SearchContainer position={position} topXs={topXs} topLg={topLg}>
          <SearchItem>
            <SingleBedIcon className={styles.heroIcon} />
            <input
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values?.city}
              type="text"
              placeholder="Where are you going?"
              className={styles.heroSearchInput}
            />
          </SearchItem>

          <SearchItem>
            <DateCheck
              handleSetDate={handleSetDate}
              isDateOpened={isDateOpened}
              setIsDateOpened={setIsDateOpened}
            />
          </SearchItem>

          <SearchItem>
            <CustomButton
              type="button"
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
            <CustomButton
              className={styles.heroSearchButton}
              disabled={isSearching}
            >
              Search
            </CustomButton>
          </SearchItem>
        </SearchContainer>

        <GenericSnackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        />
      </div>
    </form>
  );
};

export default Search;

Search.propTypes = {
  position: PropTypes.string,
  topXs: PropTypes.string,
  topLg: PropTypes.string,
};
