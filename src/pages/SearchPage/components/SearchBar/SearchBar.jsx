import { useState, useContext } from "react";
import styles from "./style.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DateCheck from "../DateCheck";
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
import SearchItemContainer from "../SearchItemContainer";

const SearchBar = ({ topXs = "80px", topLg = "80px" }) => {
  const [searchState, setSearchState] = useState({
    isOptionsOpened: false,
    isDateOpened: false,
  });
  const { isOptionsOpened, isDateOpened } = searchState;

  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateSearchParams } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleDateLogic = (newDate, currentDate) => {
    const formattedCheckInDate = dayjs(newDate.startDate).format("YYYY-MM-DD");
    const formattedCheckOutDate = dayjs(newDate.endDate).format("YYYY-MM-DD");

    if (
      formattedCheckInDate < currentDate ||
      formattedCheckOutDate < currentDate
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
        : formattedCheckOutDate === formattedCheckInDate
        ? dayjs(formattedCheckInDate).add(1, "day").format("YYYY-MM-DD")
        : formattedCheckOutDate;

    return { newCheckInDate, newCheckOutDate };
  };

  const handleSetDate = (newDate) => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const { newCheckInDate, newCheckOutDate } = handleDateLogic(
      newDate,
      currentDate
    );

    formik.setFieldValue("checkInDate", newCheckInDate);
    formik.setFieldValue("checkOutDate", newCheckOutDate);
  };

  const handleToggleState = (stateKey) => {
    setSearchState((prevState) => ({
      ...prevState,
      [stateKey]: !prevState[stateKey],
    }));
  };

  const handleCloseSearchState = () => {
    setSearchState({
      isOptionsOpened: false,
      isDateOpened: false,
    });
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
          <SearchItemContainer>
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
          </SearchItemContainer>

          <SearchItemContainer>
            <DateCheck
              dateValues={{
                checkInDate: formik.values.checkInDate,
                checkOutDate: formik.values.checkOutDate,
              }}
              handleSetDate={handleSetDate}
              isDateOpened={isDateOpened}
              toggleDate={() => handleToggleState("isDateOpened")}
            />
          </SearchItemContainer>

          <SearchItemContainer>
            <CustomButton
              type="button"
              className={styles.searchText}
              onClick={() => handleToggleState("isOptionsOpened")}
            >
              <PersonOutlineIcon className={styles.searchIcon} />
              <span>{`${formik.values.adults} adult . ${formik.values.children} children . ${formik.values.numberOfRooms} room`}</span>
            </CustomButton>
            {isOptionsOpened && (
              <div className={styles.options}>
                {[
                  { label: "Adults", option: "adults", min: 1 },
                  { label: "Children", option: "children", min: 0 },
                  { label: "Rooms", option: "numberOfRooms", min: 1 },
                ].map(({ label, option, min }) => (
                  <OptionItem
                    key={option}
                    label={label}
                    count={formik.values[option]}
                    min={min}
                    onIncrement={() => adjustValue(option, true)}
                    onDecrement={() => adjustValue(option, false)}
                  />
                ))}
              </div>
            )}
          </SearchItemContainer>

          <SearchItemContainer>
            <CustomButton
              type="submit"
              className={styles.searchButton}
              onClick={handleCloseSearchState}
            >
              Search
            </CustomButton>
          </SearchItemContainer>
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
