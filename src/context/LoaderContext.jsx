import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const LoaderContext = createContext();

const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const startLoader = () => {
    setIsLoading(true);
  };

  const stopLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, startLoader, stopLoader }}>
      {children}
      {isLoading}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;

LoaderContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
