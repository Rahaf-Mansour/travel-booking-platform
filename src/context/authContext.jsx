import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axiosInstance from "../Axios/axiosInstance";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [user, setUser] = useState(cookies["auth"]);
  const navigate = useNavigate();

  const loginUser = (authData) => {
    setCookie("auth", authData);
    setUser(authData);
  };

  useEffect(() => {
    setUser(cookies["auth"] || null);
  }, [cookies]);

  if (user) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.authentication}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  const logoutUser = () => {
    setUser(null);
    removeCookie("auth");
    navigate("/");
  };

  console.log("user", user);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

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
