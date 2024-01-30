import React from "react";
import { useAuth } from "../../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AuthNavigator = ({ children }) => {
  const { isLogin } = useAuth();
  const { pathname } = useLocation();
  // console.log("AuthNavigator page");
  return isLogin ? (
    children
  ) : (
    <Navigate to="/signin" state={{ prevPath: pathname }} />
  );
};

export default AuthNavigator;
