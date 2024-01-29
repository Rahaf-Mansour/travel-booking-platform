import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

// This is the HOC that checks if the user is an admin
export function withAdminProtection(WrappedComponent) {
  return function ProtectedComponent(props) {
    const { user } = React.useContext(AuthContext);

    if (!user || user.userType !== "Admin") {
      return <Navigate to="/" replace />;
    }

    // If user is an admin, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}
