import React from "react";
import Header from "../header";
import { LayoutPropsType } from "./layout.types";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Layout: React.FC<LayoutPropsType> = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    let token = localStorage.getItem("accessToken") ?? null;

    if (Boolean(isAuth) === false && !token) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-12">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
