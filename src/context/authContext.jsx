import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import axiosInstance from "../Axios/axiosInstance";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [user, setUser] = useState(cookies["auth"] || null);

  const loginUser = (authData) => {
    setCookie("auth", authData);
    setUser(authData);
  };

  const logoutUser = useCallback(() => {
    setUser(null);
    removeCookie("auth");
  }, [removeCookie]);

  if (user) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.authentication}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  console.log("user", user);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // unauthorized error
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logoutUser]);

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
