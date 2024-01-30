import React from "react";
import style from "./BarLoader.module.css";

export const BarLoader = () => {
  return (
    <div className={style.loader_container}>
      <div className={style.loader}></div>
    </div>
  );
};
