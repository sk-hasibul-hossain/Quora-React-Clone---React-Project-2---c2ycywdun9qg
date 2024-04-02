import React, { useEffect, useState } from "react";
import style from "./QuoraHomeFeedCard.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faDownLong,
  faEllipsis,
  faUpLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import FeedCommentCard from "../feedCommentCard/FeedCommentCard";
import { getHeaderWithProjectID } from "../../../../utills/services";
import {
  useCreatedModal,
  useHidePostStatus,
  useNightMode,
} from "../../../../provider/AuthProvider";
import EidtAndPostModal from "../../modals/editAndPostModal/EditAndDeletePostModal";

const QuoraHomeFeedCard = ({
  index,
  post,
  setIsEditPostModalOpen,
  setPostEditPostDetails,
  setPostDeleteId,
  userSortName,
}) => {
  const { isNightMode } = useNightMode();
  const { setIsCreatedModalOpen } = useCreatedModal();
  const { setHidePostStatus } = useHidePostStatus();
  const [isCommentAreaOpen, setIsCommentAreaOpen] = useState(false);
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDeleteBtnOpen, setIsEditDeleteBtnOpen] = useState(false);
  const [userFullName, setUserFullName] = useState();
  // const [userSortName, setUserSortName] = useState();
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState();
  const [postLikedDetails, setPostLikedDetails] = useState();
  const [shortName, setShortName] = useState();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(post?.createdAt));

  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setShortName(splitNameArr[0]?.substring(0, 1));
  };

  useEffect(() => {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    if (uData) {
      // setUserDetails(uData);
      converShortUserName(uData?.name);
      setUserFullName(uData?.name);
      setUserId(uData?.id);
    }

    const utoken = JSON.parse(sessionStorage.getItem("userToken"));
    if (utoken) {
      setUserToken(utoken);
    }

    const uGetLocalStorage = JSON.parse(localStorage.getItem("postLikes"));
    if (uGetLocalStorage) {
      setPostLikedDetails(uGetLocalStorage[index]);
    }

    converShortUserName(post?.author?.name);
  }, []);

  const getCommentsAPI = async () => {
    try {
      setIsLoading(true);
      const headers = {
        ...getHeaderWithProjectID().headers,
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/post/${post?._id}/comments`,
        { headers }
      );
      // console.log(response.data.data);
      setComments(response.data.data);
    } catch (err) {
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCommentsAPI();
  }, []);

  const createNewComment = async () => {
    try {
      const headers = {
        ...getHeaderWithProjectID().headers,
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.post(
        `https://academics.newtonschool.co/api/v1/quora/comment/${post?._id}`,
        { content: newComment },
        { headers }
      );
      getCommentsAPI();
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleNewComment = () => {
    createNewComment();
    setIsCreatedModalOpen("Comment Added");
  };

  const getLikedLocalStorageValue = () => {
    const getLocalValue = localStorage.getItem("postLikes");
    return JSON.parse(getLocalValue);
  };

  const setLikedLocalStorageValue = (allPostVal) => {
    localStorage.removeItem("postLikes");
    localStorage.setItem("postLikes", JSON.stringify(allPostVal));
  };

  const handleUpVote = () => {
    if (!postLikedDetails.disliked) {
      //using local strage
      const getAllLocalVal = getLikedLocalStorageValue();
      getAllLocalVal[index].liked = !postLikedDetails?.liked;
      getAllLocalVal[index].upVote = !postLikedDetails.liked
        ? parseInt(postLikedDetails.upVote) + 1
        : parseInt(postLikedDetails.upVote) - 1;
      setLikedLocalStorageValue(getAllLocalVal);

      //state Change
      setPostLikedDetails((prev) => {
        return {
          ...prev,
          liked: !prev.liked,
          upVote: !prev.liked
            ? parseInt(prev.upVote) + 1
            : parseInt(prev.upVote) - 1,
        };
      });
    }
  };

  const handleDownVote = () => {
    if (!postLikedDetails.liked) {
      //using local strage
      const getAllLocalVal = getLikedLocalStorageValue();
      getAllLocalVal[index].disliked = !postLikedDetails.disliked;
      getAllLocalVal[index].downVote = !postLikedDetails.disliked
        ? parseInt(postLikedDetails.downVote) + 1
        : parseInt(postLikedDetails.downVote) - 1;
      setLikedLocalStorageValue(getAllLocalVal);

      //state Change
      setPostLikedDetails((prev) => {
        return {
          ...prev,
          disliked: !prev.disliked,
          downVote: !prev.disliked
            ? parseInt(prev.downVote) + 1
            : parseInt(prev.downVote) - 1,
        };
      });
    }
  };
  const deletePostAPI = async (postId) => {
    const config = {
      method: "DELETE",
      headers: {
        projectID: "c2ycywdun9qg",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/quora/post/${postId}`,
        config
      );
      // const result = await response.json();
      // console.log(result);
      setPostDeleteId(postId);
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <div
      className={`${style.quora_home_feed_card_container} ${
        isNightMode && style.night_color
      }`}
    >
      <div className={style.head_despcription_area}>
        <div className={style.quora_home_header}>
          <div className={style.quora_home_feed_header_user_details}>
            {post?.author?.profileImage ? (
              <div className={style.quora_home_user_avatar_image_box}>
                <img
                  className={style.post_image}
                  src={post?.author?.profileImage}
                  alt="post profile image"
                />
              </div>
            ) : (
              <div className={style.quora_home_user_avatar}>{shortName}</div>
            )}
            <div className={style.quora_home_user_name}>
              <div className={style.post_porofile_name_wrapper}>
                <label>
                  {post?.author?.name} {"."}{" "}
                  <span className={style.post_follow_span}>Follow</span>
                </label>
                <span>{formattedDate}</span>
              </div>
              {/*<span>Follow</span>*/}
            </div>
          </div>
          <span
            title="hide post"
            onClick={() => {
              console.log(post);
              setHidePostStatus(post._id);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div
          className={`${style.quora_home_feed_despcriotion} ${
            isNightMode && style.night_color
          }`}
        >
          <h2>{post?.title}</h2>
          <p>{post?.content}</p>
        </div>
      </div>
      <div className={style.quora_home_feed_image}>
        <img src={post?.images[0]} alt="home feed image" />
      </div>
      <div className={style.post_footer_section}>
        <div className={style.vote_and_comment_section}>
          <div className={style.up_vote_and_down_vote_box}>
            <div
              className={`${style.up_vote_box} ${
                isNightMode && style.night_hover_adjustment
              }`}
              onClick={handleUpVote}
            >
              <FontAwesomeIcon
                className={`${style.up_arrow_icon} ${
                  postLikedDetails?.liked ? style.up_vote_active : ""
                }`}
                icon={faUpLong}
              />
              <label
                className={`${style.up_vote_label} ${
                  postLikedDetails?.liked ? style.up_vote_label_active : ""
                } ${isNightMode && style.votes_btn_night_mode}`}
              >
                Upvote . {postLikedDetails?.upVote}
              </label>
            </div>
            <div
              className={`${style.down_vote_box} ${
                postLikedDetails?.disliked ? style.down_vote_box_active : ""
              } ${
                isNightMode &&
                `${style.votes_btn_night_mode} ${style.night_hover_adjustment}`
              }`}
              onClick={handleDownVote}
            >
              <FontAwesomeIcon
                className={`${style.down_arrow_icon} ${
                  postLikedDetails?.disliked ? style.down_arrow_icon_active : ""
                }`}
                icon={faDownLong}
              />
              {postLikedDetails?.downVote}
            </div>
          </div>
          <div
            className={`${style.comment_section} ${
              isNightMode && style.night_color_comment_btn
            }`}
            onClick={() => {
              setIsCommentAreaOpen((prev) => !prev);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                stroke={`${isNightMode ? "#9b9a9a" : "#666"}`}
                stroke-width="1.5"
                fill="none"
              ></path>
            </svg>
            <label>{comments?.length}</label>
          </div>
        </div>
        {userId === post?.author?._id && (
          <div className={style.edit_and_post_section}>
            <span
              title="more"
              onClick={() => {
                setIsEditDeleteBtnOpen((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </span>
            {isEditDeleteBtnOpen && (
              <EidtAndPostModal
                setIsEditPostModalOpen={setIsEditPostModalOpen}
                setPostEditPostDetails={setPostEditPostDetails}
                post={post}
                deletePostAPI={deletePostAPI}
              />
            )}
          </div>
        )}
      </div>
      {isCommentAreaOpen && (
        <div className={style.comment_area}>
          <div className={style.comment_input_area}>
            <div className={style.quora_home_user_avatar}>{userSortName}</div>
            <input
              type="text"
              value={newComment}
              placeholder="Add a comment"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <button
              className={`${style.add_comment_btn} ${
                newComment ? style.comment_btn_active : ""
              }`}
              disabled={newComment ? false : true}
              onClick={handleNewComment}
            >
              Add comment
            </button>
          </div>
          <div className={style.comment_body}>
            {comments?.map((comment) => {
              return (
                <FeedCommentCard
                  comment={comment}
                  getCommentsAPI={getCommentsAPI}
                  userToken={userToken}
                  userId={userId}
                  userSortName={userSortName}
                  userFullName={userFullName}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoraHomeFeedCard;
