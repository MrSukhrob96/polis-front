import React from "react";
import { AuthProviderPropsType, InitialStateType } from "./auth-provider.types";
import Spinner from "../../spinner/spinner.component";
import { LoginParams } from "../../../models/auth";
import httpApi from "../../../utils/axios";
import { toast } from "react-toastify";

const initial = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  message: null,
} as InitialStateType;

export const AuthContext = React.createContext(initial);

export const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const [initialState, setInitialState] =
    React.useState<InitialStateType>(initial);

  const login = React.useCallback(async (user: LoginParams) => {
    setInitialState((prev) => ({ ...prev, isLoading: true }));
    await httpApi
      .post("/auth/login", JSON.stringify(user))
      .then((res) => {
        let data = res.data?.body;

        if (res.data?.status) {
          let token = data?.accessToken || "";
          let user = data?.user || null;
          setInitialState((prev) => ({
            ...prev,
            isAuth: true,
            isLoading: false,
            user,
          }));
          window.localStorage.setItem("accessToken", token);
          toast.success(res?.data?.message || "Успешно, Добро пожаловать!");
        }
      })
      .catch((err) => {
        setInitialState((prev) => ({
          ...prev,
          error: true,
          isAuth: false,
          isLoading: false,
          user: null,
        }));
        window.localStorage.removeItem("accessToken");
        toast.error(err.response?.data?.message || "Что то пошло не так!");
      });
  }, []);

  const logout = React.useCallback(async () => {
    setInitialState((prev) => ({ ...prev, isLoading: true }));
    await httpApi.post("/auth/logout");
    window.localStorage.removeItem("accessToken");
    setInitialState((prev) => ({
      ...prev,
      isAuth: false,
      isLoading: false,
      user: null,
    }));
  }, []);

  const me = React.useCallback(async () => {
    setInitialState((prev) => ({ ...prev, isLoading: true }));

    await httpApi
      .get("/auth/me")
      .then((res) => {
        let user = res?.data?.body || null;
        setInitialState((prev) => ({
          ...prev,
          isAuth: true,
          isLoading: false,
          user,
        }));
      })
      .catch((err) => {
        setInitialState((prev) => ({
          ...prev,
          error: true,
          isAuth: false,
          isLoading: false,
          user: null,
        }));
        window.localStorage.removeItem("accessToken");
      });
  }, []);

  React.useEffect(() => {
    let token = localStorage.getItem("accessToken") ?? null;

    if (initialState.isAuth === false && token) {
      me();
    }
  }, [initialState.isAuth, me]);

  return (
    <AuthContext.Provider value={{ ...initialState, login, logout, me }}>
      {initialState.isLoading && !initialState.isAuth ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
