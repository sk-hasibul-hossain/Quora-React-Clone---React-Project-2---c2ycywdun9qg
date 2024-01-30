import React, { useEffect } from "react";
import style from "./IsLoading.module.css";
import Qimage from "../../assets/image/Qimage.png";

const IsLoading = ({ setIsLoading }) => {
  useEffect(() => {
    // setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <div className={style.loading_outer_container}>
      <div className={style.loading_inner_container}>
        {/* <img
          src="https://assets.stickpng.com/images/5841c704a6515b1e0ad75aab.png"
          alt="loading_image"
        /> */}
        <img src={Qimage} alt="loading_image" />
      </div>
    </div>
  );
};

export default IsLoading;
