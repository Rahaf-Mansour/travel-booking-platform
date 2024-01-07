import { useEffect } from "react";
import axiosInstance from "../Axios/axiosInstance";
import useAuthToken from "./useAuthToken";

const useSetupAxiosInterceptors = () => {
  const authToken = useAuthToken();

  useEffect(() => {
    if (authToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [authToken]);
};

export default useSetupAxiosInterceptors;
