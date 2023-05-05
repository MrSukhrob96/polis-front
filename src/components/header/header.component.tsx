import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HeaderPropsType } from "./header.types";
import "./header.style.scss";
import useAuth from "../../hooks/useAuth";

const Header: React.FC<HeaderPropsType> = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="w-full py-6 border bg-white border-b-gray-100 z-50 shadow-green-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-60">
          <NavLink to="/">
            <img
              className="w-52 h-6 sm:w-60 sm:h-9"
              src="https://polis.online/bitrix/templates/polis/img/logo.svg"
              alt="logo"
            />
          </NavLink>
        </div>
        <nav className="w-auto flex items-center">
          <ul className="flex">
            {isAuth ? (
              <li
                className="flex items-center cursor-pointer"
                onClick={logoutHandler}
              >
                <span className="text-gray-600 text-base mr-0.5">Выйти</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#17a2b8]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to={"/login"}
                    className="flex items-center cursor-pointer mr-5"
                  >
                    <span className="text-gray-600 text-base mr-0.5">
                      Войти
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-[#17a2b8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/register"}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="text-gray-600 text-base mr-0.5">
                      Регистрация
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-[#17a2b8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);
