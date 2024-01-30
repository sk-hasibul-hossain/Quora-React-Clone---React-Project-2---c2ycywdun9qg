import React, { useEffect, useState } from "react";
import style from "./AddQuestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faChevronDown,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCreatedModal,
  useNightMode,
} from "../../../../../provider/AuthProvider";

const AddQuestion = ({ setIsPostAndQuestionOpen }) => {
  const { setIsCreatedModalOpen } = useCreatedModal();
  const { isNightMode } = useNightMode();

  const [questionValue, setQuestionValue] = useState();
  const [userSortName, setUserSortName] = useState();
  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setUserSortName(splitNameArr[0]?.substring(0, 1));
  };

  useEffect(() => {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    if (uData) {
      // setUserDetails(uData);
      converShortUserName(uData?.name);
    }
  }, []);

  const handleQuestionSubmit = () => {
    let res;
    if (questionValue && !questionValue?.endsWith("?")) {
      res = `${questionValue}?`;
    } else {
      res = questionValue;
    }
    setIsCreatedModalOpen("Question added");
    // console.log("question value", res);
  };
  return (
    <div className={style.add_question_container}>
      <div
        className={`${style.add_question_box_intruction} ${
          isNightMode && style.night_add_question_box_intruction
        }`}
      >
        <h1>Tips on getting good answers quickly</h1>
        <ul>
          <li>Make sure your question has not been asked already</li>
          <li>Keep your question short and to the point</li>
          <li>Double-check grammar and spelling</li>
        </ul>
      </div>
      <div className={style.box_wrapper}>
        <div
          className={`${style.question_input_area} ${
            isNightMode && style.night_question_input_area
          }`}
        >
          <div className={style.question_input_title}>
            <div className={style.quora_header_user_avatar}>{userSortName}</div>
            <FontAwesomeIcon
              className={`${isNightMode && style.night_fa_caret_Right}`}
              icon={faCaretRight}
            />
            <div className={style.question_visibility}>
              <FontAwesomeIcon icon={faUserGroup} />
              <label>public</label>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
          <input
            type="text"
            value={questionValue}
            placeholder='Start your question with "What", "how", "Why", etc.'
            onChange={(e) => {
              const qVal = e.target.value;
              setQuestionValue(qVal);
            }}
          />
        </div>
        <div className={style.question_button_area}>
          <button
            className={style.question_cancel_btn}
            onClick={() => {
              setIsPostAndQuestionOpen("");
            }}
          >
            Cancel
          </button>
          <button
            disabled={questionValue ? false : true}
            className={`${style.add_question_btn} ${
              questionValue && style.active_btn
            }`}
            onClick={handleQuestionSubmit}
          >
            Add question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
