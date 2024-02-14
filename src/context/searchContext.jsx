import { createContext, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    checkInDate: dayjs().format("YYYY-MM-DD"),
    checkOutDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
    city: "",
    adults: 1,
    children: 0,
    numberOfRooms: 1,
  });

  const updateSearchParams = (newParams) => {
    setSearchParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const getNumberOfNights = () => {
    const startDate = new Date(searchParams.checkInDate);
    const endDate = new Date(searchParams.checkOutDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const nightsLength = Math.round(differenceInDays);
    return nightsLength;
  };

  return (
    <SearchContext.Provider
      value={{ searchParams, updateSearchParams, getNumberOfNights }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
