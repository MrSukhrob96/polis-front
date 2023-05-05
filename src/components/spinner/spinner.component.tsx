import React from "react";
import "./spinner.styles.scss";
import { SpinnerPropsType } from "./spinner.types";

const Spinner: React.FC<SpinnerPropsType> = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 right-0 bottom-0 z-50" id="spinner">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
};

export default Spinner;
