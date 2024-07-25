import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginHeader from "../organisms/Header/LoginHeader/LoginHeader";

const LoginLayout: React.FC = () => {
  const location  = useLocation().pathname
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);
  return (
    <>
      <LoginHeader />
      <Outlet />
    </>
  );
};

export default LoginLayout;
