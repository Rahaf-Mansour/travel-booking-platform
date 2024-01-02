import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { searchAPI } from "../services/searchService";
import dayjs from "dayjs";
import { LoaderContext } from "./LoaderContext";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [searchProps, setSearchProps] = useState({
    city: "",
    checkInDate: dayjs().format("YYYY-MM-DD"),
    checkOutDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
    adults: 2,
    children: 0,
    room: 1,
  });
  const { startLoader, stopLoader } = useContext(LoaderContext);

  const callSearchAPI = async (values) => {
    try {
      startLoader();
      const response = await searchAPI(values);
      setSearchProps((prevProps) => ({ ...prevProps, ...values }));
      setSearchData((prevData) => [...prevData, ...response]);
    } catch (error) {
      console.log(error.message || "Error: Can't search");
    } finally {
      stopLoader();
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchData,
        callSearchAPI,
        searchProps,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
