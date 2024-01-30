import React from "react";
import style from "./ShareDeskBox.module.css";
import {
  useNightMode,
  usePostAndQuestionModalStatus,
} from "../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ShareDeskBox = ({ userSortName }) => {
  const { isNightMode } = useNightMode();
  const navigate = useNavigate();
  const { setIsPostAndQuestionOpen } = usePostAndQuestionModalStatus();
  return (
    <div
      className={`${style.share_desk_box_outer_container} ${
        isNightMode && style.night_color
      }`}
    >
      <div className={style.share_desk_section_one}>
        <div className={style.share_desk_user_avatar}>{userSortName}</div>
        <div
          className={style.ask_and_share_box}
          onClick={() => {
            setIsPostAndQuestionOpen("question");
          }}
        >
          What do you want to ask or share
        </div>
      </div>
      <div className={style.share_desk_section_two}>
        <div className={style.share_desk_item_one}>
          <div
            className={style.item_overlay}
            onClick={() => {
              setIsPostAndQuestionOpen("question");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                class="icon_svg-stroke"
                stroke="#666"
                stroke-width="1.5"
                fill="none"
                fill-rule="evenodd"
              >
                <g transform="translate(9 7)">
                  <path
                    d="M3 6v-.5A2.5 2.5 0 1 0 .5 3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <circle
                    class="icon_svg-fill_as_stroke"
                    fill="#666"
                    cx="3"
                    cy="8.5"
                    r="1"
                    stroke="none"
                  ></circle>
                </g>
                <path
                  d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <label>Ask</label>
          </div>
        </div>
        <div className={style.share_desk_item_two}>
          <div
            className={style.item_overlay}
            onClick={() => {
              navigate("/answer");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke-width="1.5" fill="none" fill-rule="evenodd">
                <path
                  d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
                  class="icon_svg-stroke"
                  stroke="#666"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  class="icon_svg-fill_as_stroke"
                  fill="#666"
                  d="m4.429 19.571 2.652-.884-1.768-1.768z"
                ></path>
                <path
                  d="M14.5 19.5h5v-5m-10-10h-5v5"
                  class="icon_svg-stroke"
                  stroke="#666"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <label>Answer</label>
          </div>
        </div>
        <div className={style.share_desk_item_three}>
          <div
            className={style.item_overlay}
            onClick={() => {
              setIsPostAndQuestionOpen("post");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z"
                  class="icon_svg-stroke"
                  stroke="#666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  class="icon_svg-fill_as_stroke"
                  fill="#666"
                  d="m4.429 19.571 2.652-.884-1.768-1.768z"
                ></path>
              </g>
            </svg>
            <label>Post</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDeskBox;
