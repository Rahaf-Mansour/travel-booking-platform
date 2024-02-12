import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={[isLoading, startLoading, stopLoading]}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;

LoadingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
