import React from "react";
import style from "./LanguageModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const LanguageModal = () => {
  return (
    <div className={style.language_modal_container}>
      <div className={style.section_one}>
        <h1>Language</h1>
      </div>
      <div className={style.section_two}>
        <section>
          <div className={style.circle_language}>EN</div>
          <label>English</label>
        </section>
        <span className={style.circle_check_icon}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </div>
      <div className={style.section_three}>
        <label>Add languages</label>
        <label>See all languages</label>
      </div>
    </div>
  );
};

export default LanguageModal;
