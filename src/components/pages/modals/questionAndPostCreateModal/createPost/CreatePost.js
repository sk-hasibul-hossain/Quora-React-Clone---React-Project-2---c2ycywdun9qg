import React, { useEffect, useRef, useState } from "react";
import style from "./CreatePost.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { getHeaderWithProjectID } from "../../../../../utills/services";
import {
  useCreatedModal,
  useNewPostStatus,
  useNightMode,
} from "../../../../../provider/AuthProvider";

const CreatePost = ({ setIsPostAndQuestionOpen }) => {
  const { setIsCreatedModalOpen } = useCreatedModal();
  const { setIsNewPost } = useNewPostStatus();
  const { isNightMode } = useNightMode();
  const [userSortName, setUserSortName] = useState();
  const [userFullName, setUserFullName] = useState();
  const [userToken, setUserToken] = useState();
  const [postTitle, setPostTitle] = useState();
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setUserSortName(splitNameArr[0]?.substring(0, 1));
  };

  useEffect(() => {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    if (uData) {
      // setUserDetails(uData);
      setUserFullName(uData?.name);
      converShortUserName(uData?.name);
    }
    if (token) {
      setUserToken(token);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPostImage(selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current.click();
  };

  const createPostAPI = async (postContent, postImage, postTitle) => {
    try {
      const headers = {
        Authorization: `Bearer ${userToken}`,
        projectID: "c2ycywdun9qg",
      };
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("content", postContent);
      formData.append("images", postImage);
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/quora/post/",
        formData,
        { headers }
      );
      // console.log(response);
      setIsNewPost((prev) => !prev);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleCreatePost = () => {
    // console.log(postContent, postImage, postTitle);
    createPostAPI(postContent, postImage, postTitle);
    setIsCreatedModalOpen("Post created");
    setIsPostAndQuestionOpen("");
  };
  return (
    <div className={style.create_post_container}>
      <div className={style.create_post_header}>
        <div
          className={`${style.section_one} ${
            isNightMode && style.night_section_one
          }`}
        >
          <div className={style.quora_header_user_avatar}>{userSortName}</div>
          <h1>{userFullName}</h1>
        </div>
        <input
          className={`${style.post_title} ${
            isNightMode && style.night_post_title
          }`}
          type="text"
          placeholder="Post title"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <textarea
          className={`${style.create_post_input_box} ${
            isNightMode && style.night_create_post_input_box
          }`}
          placeholder="Say Something..."
          value={postContent}
          rows="4"
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>
      <div className={style.image_preview_area}>
        <div className={style.image_preview}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className={style.preview_image}
            />
          )}
          {imagePreview && (
            <span
              className={style.remove_photo}
              onClick={() => {
                setImagePreview(null);
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          )}
        </div>
      </div>
      <div className={style.button_area}>
        <span
          className={`${style.photo_upload_icon} ${
            isNightMode && style.night_photo_upload_icon
          }`}
          onClick={handlePhotoUploadClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <FontAwesomeIcon icon={faPhotoFilm} />
        </span>
        <button
          className={`${style.post_create_btn} ${
            postContent && postImage && postTitle ? style.active_btn : ""
          }`}
          disabled={postContent && postImage && postTitle ? false : true}
          onClick={handleCreatePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
