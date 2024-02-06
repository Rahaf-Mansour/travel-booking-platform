import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.userType)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
