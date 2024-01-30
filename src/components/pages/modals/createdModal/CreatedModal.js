import React, { useEffect } from "react";
import style from "./CreatedModal.module.css";

const CreatedModal = ({ isCreatedModalOpen, setIsCreatedModalOpen }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsCreatedModalOpen("");
    }, 3000);
  }, []);
  return (
    <div className={style.created_modal_container}>
      <div className={style.created_modal_inner_container}>
        {isCreatedModalOpen}
      </div>
    </div>
  );
};

export default CreatedModal;
