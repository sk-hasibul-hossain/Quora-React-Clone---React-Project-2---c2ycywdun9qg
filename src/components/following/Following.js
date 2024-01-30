import React from "react";
import style from "./Following.module.css";
import gif from "../assets/gif/underConstraction.gif";

const Following = () => {
  return (
    <div className={style.following_container}>
      <img src={gif} />
    </div>
  );
};

export default Following;
