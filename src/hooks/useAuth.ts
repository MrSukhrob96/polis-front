import React from "react";
import { AuthContext } from "../components";

const useAuth = () => {
  const auth = React.useContext(AuthContext);

  return {
    ...auth,
  };
};

export default useAuth;
