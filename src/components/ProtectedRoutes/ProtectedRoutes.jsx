import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

// This is the HOC that checks if the user is a user
export function withUserProtection(WrappedComponent) {
  return function ProtectedComponent(props) {
    const { user } = React.useContext(AuthContext);

    if (!user || user.userType !== "User") {
      return <Navigate to="/" replace />;
    }

    // If user is a user, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}

// This is the HOC that checks if the user is an admin
export function withAdminProtection(WrappedComponent) {
  return function ProtectedComponent(props) {
    const { user } = React.useContext(AuthContext);

    if (!user || user.userType !== "Admin") {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}
