import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({});

  const updateSearchData = (newData) => {
    setSearchData(newData);
  };

  return (
    <SearchContext.Provider value={{ searchData, updateSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
