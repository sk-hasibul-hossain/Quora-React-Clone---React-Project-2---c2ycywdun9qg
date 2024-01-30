import React from "react";
import style from "./RightSideBar.module.css";

const RightSideBar = () => {
  return (
    <div className={style.right_side_Bar_container}>
      <div className={style.right_side_bar_ad_title}>
        <lable>Advertisement</lable>
      </div>
    </div>
  );
};

export default RightSideBar;
