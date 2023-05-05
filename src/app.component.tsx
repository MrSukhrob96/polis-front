import { AuthProvider } from "./components";
import { RouterProvider } from "react-router-dom";
import routers from "./router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={routers} />
      </AuthProvider>
      <ToastContainer autoClose={1000} position="top-right" className="mt-12" />
    </>
  );
}

export default App;
