import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.userType)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
