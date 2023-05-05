import React from "react";
import { HomePropsType } from "./home.types";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";

const HomePage: React.FC<HomePropsType> = () => {
  const { isAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">HomePage</h1>
    </div>
  );
};

export default HomePage;
