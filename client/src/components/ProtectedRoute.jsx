import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
   if (!isAuthenticated) {
      return <Navigate to="/login" />;
   }else{
      return children ? children : <Outlet/>;
   }
};

export default ProtectedRoute;
