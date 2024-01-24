import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext([false, () => {}]);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
