import React from "react";
import { LoginPropsType } from "./login.types";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { Spinner } from "../../../components";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Поля логин обязательны для заполнения")
    .min(6, "Пароль должен быть не менее 6 символов"),
  password: yup
    .string()
    .required("Поля пароль обязательны для заполнения!")
    .min(6, "Пароль должен быть не менее 6 символов")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Пароль должен содержать как минимум одну заглавную букву, строчную букву и цифру"
    ),
});

const LoginPage: React.FC<LoginPropsType> = () => {
  const navigate = useNavigate();

  const { isAuth, isLoading, login } = useAuth();

  const loginHandler = (data: FormData) => {
    login(data);
    navigate("/");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isAuth === true) {
      return navigate("/");
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="sm:w-[450px] mx-auto sm:my-10 my-5 w-full">
      <div className="sm:px-10 sm:py-8 sm:rounded-md sm:shadow-xl sm:shadow-gray-200 p-5">
        <form autoComplete="off" onSubmit={handleSubmit(loginHandler)}>
          <div>
            <label htmlFor="email" className="ml-2 text-gray-600">
              Логин:
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mb-1 input"
                  type="text"
                  placeholder="alex@gmail.com"
                />
              )}
            />
            <div className="h-5">
              {errors.email && (
                <p className="italic text-xs text-red-500 px-3">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="ml-2 text-gray-600">
              Пароль:
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mb-1 input"
                  type="text"
                  placeholder="**********"
                />
              )}
            />
            <div className="h-4">
              {errors.password && (
                <p className="italic text-xs text-red-500 px-3">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="py-5">
            <button
              type="submit"
              className="w-full sm:p-4 p-3 rounded-md border border-[#17a2b8] ring-1 ring-gray-50 bg-[#17a2b8] font-bold text-white shadow"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
