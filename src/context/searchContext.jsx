import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    checkInDate: null,
    checkOutDate: null,
    city: "",
    adults: 1,
    children: 0,
    numberOfRooms: 1,
  });

  const updateSearchParams = (newParams) => {
    setSearchParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const getNumberOfNights = () => {
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      return 0;
    }

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
