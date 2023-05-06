import React from "react";

import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import { RegisterPropsType } from "./register.types";
import httpApi from "../../../utils/axios";
import { User } from "../../../models/user";


const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Необходим имя")
    .min(2, "Поля имя обязательны для заполнения"),
  lastName: yup
    .string()
    .required("Необходим фамилия")
    .min(2, "Поля Фамилия обязательны для заполнения"),
  email: yup
    .string()
    .required("Необходим логин")
    .min(6, "Поля для логина обязательны"),
  password: yup
    .string()
    .required("Необходим пароль")
    .min(6, "Поля для пароля обязательны")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Пароль должен содержать как минимум одну заглавную букву, строчную букву и цифру"
    ),
});

const RegisterPage: React.FC<RegisterPropsType> = () => {
  const navigate = useNavigate();

  const registerHandler = async (data: User) => {
    httpApi
      .post("/auth/register", JSON.stringify(data))
      .then((res) => {
        if (res.data?.status) {
          toast.success(res?.data?.message || "Успешно!");
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Что то пошло не так!");
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  return (
    <div className="sm:w-[450px] mx-auto sm:my-10 my-0 w-full">
      <div className="sm:px-10 sm:py-8 sm:rounded-md sm:shadow-xl sm:shadow-gray-200 p-5">
        <form autoComplete="off" onSubmit={handleSubmit(registerHandler)}>
          <div>
            <label htmlFor="firstName" className="ml-2 text-gray-600">
              Имя:
            </label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mb-1 input"
                  type="text"
                  placeholder="Alex"
                />
              )}
            />
            <div className="h-5">
              {errors.firstName && (
                <p className="italic text-xs text-red-500 px-3">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="ml-2 text-gray-600">
              Фамилия:
            </label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mb-1 input"
                  type="text"
                  placeholder="Alexevich"
                />
              )}
            />
            <div className="h-5">
              {errors.lastName && (
                <p className="italic text-xs text-red-500 px-3">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
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
                  type="password"
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
              Зарегистрировать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
