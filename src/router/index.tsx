import { createBrowserRouter } from "react-router-dom";

/**
 * List of components
 */
import { Layout } from "../components";

/**
 * List of pages
 */
import NotfoundPage from "../modules/errors/notfaund";
import LoginPage from "../modules/auth/login";
import RegisterPage from "../modules/auth/register";
import HomePage from "../modules/home";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotfoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default routers;
