import React, { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const loginUser = (authData) => {
    setCookie("auth", authData);
  };

  const logoutUser = () => {
    setUser(null);
    removeCookie("auth");
    navigate("/");
  };

  useEffect(() => {
    setUser(cookies["auth"] || null);
  }, [cookies]);

  console.log("user", user);

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
