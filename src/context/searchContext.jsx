import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    checkInDate: null,
    checkOutDate: null,
  });

  const updateSearchParams = (newParams) => {
    setSearchParams((prevState) => ({ ...prevState, ...newParams }));
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
