import React from "react";
import style from "./Answer.module.css";
import gif from "../assets/gif/underConstraction.gif";

const Answer = () => {
  return (
    <div className={style.answer_container}>
      <img src={gif} />
    </div>
  );
};

export default Answer;
