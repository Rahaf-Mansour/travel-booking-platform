import { useState } from "react";

const useComponentLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  const stopLoading = () => {
    setIsLoading(false);
  };

  return { isLoading, stopLoading };
};

export default useComponentLoader;
