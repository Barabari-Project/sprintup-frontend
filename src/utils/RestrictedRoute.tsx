import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface RestrictedRouteProps {
  children: ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (user) {
    return (
      <Navigate
        to={location.state?.from?.pathname || "/dashboard"}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default RestrictedRoute;
