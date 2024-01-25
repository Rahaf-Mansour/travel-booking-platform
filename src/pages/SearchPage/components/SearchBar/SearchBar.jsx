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
import { useNavigate, useSearchParams } from "react-router-dom";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import { SearchContext } from "../../../../context/searchContext";

const SearchBar = ({ topXs = "80px", topLg = "80px" }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const [isDateOpened, setIsDateOpened] = useState(false);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateSearchParams } = useContext(SearchContext);

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
  };

  const adjustValue = (option, increment) => {
    const oldValue = formik.values[option];
    const newValue = increment ? oldValue + 1 : oldValue - 1;
    formik.setFieldValue(option, newValue);
  };

  const formik = useFormik({
    initialValues: {
      city: searchParams.get("city") || "",
      checkInDate:
        searchParams.get("checkInDate") || dayjs().format("YYYY-MM-DD"),
      checkOutDate:
        searchParams.get("checkOutDate") ||
        dayjs().add(1, "day").format("YYYY-MM-DD"),
      adults: parseInt(searchParams.get("adults"), 10) || 2,
      children: parseInt(searchParams.get("children"), 10) || 0,
      numberOfRooms: parseInt(searchParams.get("numberOfRooms"), 10) || 1,
    },
    onSubmit: (values) => {
      const newSearchParams = new URLSearchParams(values);
      setSearchParams(newSearchParams);
      updateSearchParams({
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
      });
      navigate("/search?" + newSearchParams.toString());
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
              value={formik.values.city}
              type="text"
              placeholder="Where are you going?"
              className={styles.searchInput}
            />
          </SearchItem>

          <SearchItem>
            <DateCheck
              dateValues={{
                checkInDate: formik.values.checkInDate,
                checkOutDate: formik.values.checkOutDate,
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
              <span>{`${formik.values.adults} adult . ${formik.values.children} children . ${formik.values.numberOfRooms} room`}</span>
            </CustomButton>
            {isOptionsOpened && (
              <div className={styles.options}>
                <OptionItem
                  label="Adults"
                  count={formik.values.adults}
                  min={1}
                  onIncrement={() => adjustValue("adults", true)}
                  onDecrement={() => adjustValue("adults", false)}
                />
                <OptionItem
                  label="Children"
                  count={formik.values.children}
                  onIncrement={() => adjustValue("children", true)}
                  onDecrement={() => adjustValue("children", false)}
                />
                <OptionItem
                  label="Rooms"
                  count={formik.values.numberOfRooms}
                  min={1}
                  onIncrement={() => adjustValue("numberOfRooms", true)}
                  onDecrement={() => adjustValue("numberOfRooms", false)}
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
