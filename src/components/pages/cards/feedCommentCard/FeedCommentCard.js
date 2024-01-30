import React, { useState } from "react";
import style from "./FeedCommentCard.module.css";
import axios from "axios";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHeaderWithProjectID } from "../../../../utills/services";
import { useNightMode } from "../../../../provider/AuthProvider";

const FeedCommentCard = ({
  comment,
  getCommentsAPI,
  userToken,
  userId,
  userSortName,
  userFullName,
}) => {
  const { isNightMode } = useNightMode();
  const [isDeleteBtnOpen, steIsDeleteBtnOpen] = useState(false);
  const deleteComment = async () => {
    try {
      const headers = {
        ...getHeaderWithProjectID().headers,
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/quora/comment/${comment?._id}`,
        { headers }
      );
      getCommentsAPI();
    } catch (err) {
      console.log("error", err);
    }
  };
  const handleDeleteComment = () => {
    deleteComment();
    // console.log(comment, comment?.author, userId);
  };
  return (
    <div
      className={`${style.feed_comment_card} ${
        isNightMode && style.night_mode
      }`}
    >
      <div
        className={`${style.wrap} ${
          isNightMode && style.night_mode_font_color
        }`}
      >
        {userId?.localeCompare(comment?.author) === 0 ? (
          <div
            className={style.quora_home_user_avatar}
            style={{ backgroundColor: "rgb(236, 109, 6)" }}
          >
            {userSortName}
          </div>
        ) : (
          <div className={style.quora_home_user_avatar}>A</div>
        )}
        <div
          className={`${style.comment_card_wrapper} ${
            isNightMode && style.night_mode_font_color
          }`}
        >
          <h1>
            {userId?.localeCompare(comment?.author) === 0
              ? userFullName
              : "Anonymous"}
          </h1>
          <label>{comment?.content}</label>
        </div>
      </div>
      <div className={style.delete_wraper}>
        <span
          onClick={() => {
            steIsDeleteBtnOpen((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
        {isDeleteBtnOpen && (
          <div
            className={style.delete_comment_btn_area}
            onClick={handleDeleteComment}
          >
            <FontAwesomeIcon
              className={style.comment_delete_btn_icon}
              icon={faTrash}
            />
            <div className={style.delete_comment_btn}>Delete</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCommentCard;
