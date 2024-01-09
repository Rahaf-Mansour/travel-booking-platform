import React, { useState, useContext } from "react";
import styles from "./style.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchItem from "../SearchItem";
import DateCheck from "../../../Home/components/DateCheck";
import OptionItem from "../OptionItem";
import CustomButton from "../../../../components/CustomButton";
import PropTypes from "prop-types";
import { SearchContainer } from "./styles";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../../context/searchContext";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";

const SearchBar = ({ topXs = "80px", topLg = "80px" }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const [isDateOpened, setIsDateOpened] = useState(false);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const { callSearchAPI, searchProps } = useContext(SearchContext);
  const navigateToSearchPage = useNavigate();

  const handleSetDate = (newDate) => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const formattedCheckInDate = dayjs(newDate.startDate).format("YYYY-MM-DD");
    const formattedCheckOutDate = dayjs(newDate.endDate).format("YYYY-MM-DD");

    if (
      formattedCheckInDate < currentDate ||
      formattedCheckOutDate <= currentDate
    ) {
      showErrorSnackbar(
        "Whoops! Check-in date or check-out date cannot be in the past."
      );
    }

    const newCheckInDate =
      formattedCheckInDate < currentDate ? currentDate : formattedCheckInDate;

    const newCheckOutDate =
      formattedCheckOutDate <= currentDate
        ? dayjs(currentDate).add(1, "day").format("YYYY-MM-DD")
        : formattedCheckOutDate;

    formik.setFieldValue("checkInDate", newCheckInDate);
    formik.setFieldValue("checkOutDate", newCheckOutDate);

    console.log("Updated dates:", newCheckInDate, newCheckOutDate);
  };

  const handleIncrement = (option) => {
    const oldValue = formik.values[option];
    formik.setFieldValue(option, oldValue + 1);
  };

  const handleDecrement = (option) => {
    const oldValue = formik.values[option];
    formik.setFieldValue(option, oldValue - 1);
  };

  const formik = useFormik({
    initialValues: searchProps,
    onSubmit: async (values) => {
      await callSearchAPI(values);
      navigateToSearchPage("/search");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className={styles.parent}>
        <SearchContainer topXs={topXs} topLg={topLg}>
          <SearchItem>
            <SingleBedIcon className={styles.searchIcon} />
            <input
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values?.city}
              type="text"
              placeholder="Where are you going?"
              className={styles.searchInput}
            />
          </SearchItem>

          <SearchItem>
            <DateCheck
              dateValues={{
                checkInDate: formik.values?.checkInDate,
                checkOutDate: formik.values?.checkOutDate,
              }}
              handleSetDate={handleSetDate}
              isDateOpened={isDateOpened}
              setIsDateOpened={setIsDateOpened}
            />
          </SearchItem>

          <SearchItem>
            <CustomButton
              type="button"
              className={styles.searchText}
              onClick={() => setIsOptionsOpened(!isOptionsOpened)}
            >
              <PersonOutlineIcon className={styles.searchIcon} />
              <span>
                {`${formik.values?.adults} adult . ${formik.values?.children} children . ${formik.values?.room} room`}
              </span>
            </CustomButton>
            {isOptionsOpened && (
              <div className={styles.options}>
                <OptionItem
                  label="Adults"
                  count={formik.values?.adults}
                  min={1}
                  onIncrement={() => handleIncrement("adults")}
                  onDecrement={() => handleDecrement("adults")}
                />
                <OptionItem
                  label="Children"
                  count={formik.values?.children}
                  onIncrement={() => handleIncrement("children")}
                  onDecrement={() => handleDecrement("children")}
                />
                <OptionItem
                  label="Rooms"
                  count={formik.values?.room}
                  min={1}
                  onIncrement={() => handleIncrement("room")}
                  onDecrement={() => handleDecrement("room")}
                />
              </div>
            )}
          </SearchItem>
          <SearchItem>
            <CustomButton type="submit" className={styles.searchButton}>
              Search
            </CustomButton>
          </SearchItem>
        </SearchContainer>
      </div>
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </form>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  topXs: PropTypes.string,
  topLg: PropTypes.string,
};
