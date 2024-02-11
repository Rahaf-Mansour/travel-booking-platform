import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
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

  return (
    <SearchContext.Provider value={{ searchParams, updateSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
