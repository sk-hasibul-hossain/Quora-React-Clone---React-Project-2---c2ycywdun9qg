import React, { useEffect, useRef, useState } from "react";
import style from "./EditPostModal.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPhotoFilm,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useNightMode } from "../../../../provider/AuthProvider";

const EditPostModal = ({
  setIsEditPostModalOpen,
  userFullName,
  userSortName,
  setPostEditPostDetails,
  postEditPostDetails,
  setUpdatePost,
}) => {
  const { isNightMode } = useNightMode();
  const [userToken, setUserToken] = useState();
  const [postImage, setPostImage] = useState(postEditPostDetails?.images[0]);
  const [postTitle, setPostTitle] = useState(postEditPostDetails?.title);
  const [postContent, setPostContent] = useState(postEditPostDetails?.content);

  const [imagePreview, setImagePreview] = useState();
  const [updatePostImage, setUpdatePostImage] = useState();

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUpdatePostImage(selectedFile);
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

  const updatePostApi = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${userToken}`,
        projectID: "c2ycywdun9qg",
      };
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("content", postContent);
      formData.append("images", updatePostImage ? updatePostImage : postImage);
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/quora/post/${postEditPostDetails._id}`,
        formData,
        { headers }
      );
      setUpdatePost({
        title: postTitle,
        content: postContent,
        images: updatePostImage ? updatePostImage : postImage,
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleUpdatePost = () => {
    updatePostApi();
    setIsEditPostModalOpen(false);
  };

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    if (token) {
      setUserToken(token);
    }
  }, []);
  return createPortal(
    <div
      className={`${style.post_edit_modal_outer_container} ${
        isNightMode && style.night_mode_modal_outer
      }`}
    >
      <div
        className={`${style.post_edit_modal_inner_container} ${
          isNightMode && style.night_mode_modal_inner
        }`}
      >
        <div className={style.post_edit_header}>
          <div className={style.modal_close_section}>
            <span
              className={style.cross_icon_span}
              onClick={() => {
                setIsEditPostModalOpen(false);
              }}
            >
              <FontAwesomeIcon
                className={`${style.cross_icon} ${
                  isNightMode && style.night_cross_icon
                }`}
                icon={faXmark}
              />
            </span>
          </div>
          <div className={style.modal_post_title_bar}>
            <h1>Update Post</h1>
          </div>
          <div
            className={`${style.modal_user_details_section} ${
              isNightMode && style.night_modal_user_color
            }`}
          >
            <div className={style.quora_header_user_avatar}>{userSortName}</div>
            <h1>{userFullName}</h1>
          </div>
          <div className={style.modal_input_area}>
            <input
              className={`${style.post_title} ${
                isNightMode && style.night_post_title
              }`}
              value={postTitle}
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
              value={postContent}
              placeholder="Say Something..."
              row="4"
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={style.post_image_preview_area}>
          {(postImage || imagePreview) && (
            <div className={style.image_preview}>
              <img
                src={imagePreview ? imagePreview : postImage}
                alt="post image"
              />
              {imagePreview && (
                <span
                  className={style.remove_photo}
                  onClick={() => {
                    setImagePreview(null);
                    setUpdatePostImage(null);
                  }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              )}
            </div>
          )}
        </div>
        <div className={style.footer_section}>
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
          {/* <button
            disabled={
              postTitle.localeCompare(postEditPostDetails?.title) !== 0 ||
              postContent.localeCompare(postEditPostDetails?.content) !== 0 ||
              updatePostImage
                ? false
                : true
            }
            className={`${style.post_update_button} ${
              postTitle.localeCompare(postEditPostDetails?.title) !== 0 ||
              postContent.localeCompare(postEditPostDetails?.content) !== 0 ||
              updatePostImage
                ? style.active_btn
                : ""
            }`}
            onClick={handleUpdatePost}
          > */}
          <button
            disabled={
              postTitle.localeCompare(postEditPostDetails?.title) !== 0 ||
              postContent.localeCompare(postEditPostDetails?.content) !== 0 ||
              imagePreview
                ? false
                : true
            }
            className={`${style.post_update_button} ${
              postTitle.localeCompare(postEditPostDetails?.title) !== 0 ||
              postContent.localeCompare(postEditPostDetails?.content) !== 0 ||
              imagePreview
                ? style.active_btn
                : ""
            }`}
            onClick={handleUpdatePost}
          >
            Update
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default EditPostModal;
