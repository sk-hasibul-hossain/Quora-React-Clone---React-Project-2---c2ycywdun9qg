import React from "react";
import style from "./QuestionAndPostCreateModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AddQuestion from "./addQuestion/AddQuestion";
import CreatePost from "./createPost/CreatePost";
import { createPortal } from "react-dom";
import { useNightMode } from "../../../../provider/AuthProvider";

const questionAndPostCreateModal = ({
  isPostAndQuestionOpen,
  setIsPostAndQuestionOpen,
}) => {
  const { isNightMode } = useNightMode();
  return createPortal(
    <div
      className={`${style.question_and_post_modal_outer_container} ${
        isNightMode && style.night_color_outer_background
      }`}
    >
      <div
        className={`${style.question_and_post_modal_inner_container} ${
          isNightMode && style.night_inner_modal_color
        }`}
      >
        <div className={style.question_and_post_header}>
          <div className={style.section_one}>
            <span
              className={`${style.cross_icon_span} ${
                isNightMode && style.night_cross_icon_span
              }`}
              onClick={() => {
                setIsPostAndQuestionOpen("");
              }}
            >
              <FontAwesomeIcon className={style.cross_icon} icon={faXmark} />
            </span>
          </div>
          <div className={style.section_two}>
            <div
              className={`${style.header_item} ${
                isPostAndQuestionOpen === "question"
                  ? style.header_item_active
                  : ""
              } ${isNightMode && style.night_header_item}`}
              onClick={() => {
                setIsPostAndQuestionOpen("question");
              }}
            >
              Add question
            </div>
            <div
              className={`${style.header_item} ${
                isPostAndQuestionOpen === "post" ? style.header_item_active : ""
              } ${isNightMode && style.night_header_item}`}
              onClick={() => {
                setIsPostAndQuestionOpen("post");
              }}
            >
              Create Post
            </div>
          </div>
        </div>
        <div className={style.question_and_post_body}>
          {isPostAndQuestionOpen === "question" ? (
            <AddQuestion setIsPostAndQuestionOpen={setIsPostAndQuestionOpen} />
          ) : (
            <CreatePost />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default questionAndPostCreateModal;
