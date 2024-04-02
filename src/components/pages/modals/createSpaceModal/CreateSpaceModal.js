import React, { useEffect, useRef, useState } from "react";
import style from "./CreateSpaceModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPhotoFilm,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCreatedModal,
  useNightMode,
} from "../../../../provider/AuthProvider";
import axios from "axios";
import { createPortal } from "react-dom";

const CreateSpaceModal = ({ setIsCreateSpaceModalOpen }) => {
  const { setIsCreatedModalOpen } = useCreatedModal();
  const { isNightMode } = useNightMode();

  const [postImage, setPostImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [spaceName, setSpaceName] = useState();
  const [descriptionContent, setDescriptionContent] = useState();
  const [userToken, setUserToken] = useState();
  const [isGroupExist, setISGroupExist] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    if (token) {
      setUserToken(token);
    }
  }, []);

  const creaSpaceAPI = async () => {
    // console.log(spaceName, descriptionContent, postImage, userToken);
    try {
      const headers = {
        Authorization: `Bearer ${userToken}`,
        projectID: "c2ycywdun9qg",
      };
      const formData = new FormData();
      formData.append("name", spaceName);
      formData.append("description", descriptionContent);
      formData.append("image", postImage);
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/quora/channel/",
        formData,
        { headers }
      );
      // console.log(response);
      // setIsNewPost((prev) => !prev);
    } catch (err) {
      // console.log("Error", err.response.data.message);
      if (
        err?.response?.data?.message.localeCompare(
          'Duplicate field value: "test". Please use another value!'
        ) === 0
      ) {
        setISGroupExist(true);
      } else {
        setISGroupExist(false);
      }
    }
  };

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

  const handleCreateSpace = () => {
    creaSpaceAPI();
    if (!isGroupExist) {
      setIsCreatedModalOpen("New space Created");
      setIsCreateSpaceModalOpen(false);
    }
  };
  return createPortal(
    <div
      className={`${style.create_space_modal_outer_container} ${
        isNightMode && style.night_color
      }`}
    >
      <div
        className={`${style.create_space_modal_inner_container} ${
          isNightMode && style.night_modal_color
        }`}
      >
        <div className={style.create_space_wrapper}>
          <div className={style.create_space_header}>
            <span
              onClick={() => {
                setIsCreateSpaceModalOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div
            className={`${style.create_space_title} ${
              isNightMode && style.night_create_space_title
            }`}
          >
            <h1>Create Space</h1>
            <label>
              Share your interests, curate content, host discussions, and more.
            </label>
          </div>
          <div className={style.create_space_input_section}>
            <div
              className={`${style.input_wrapper} ${
                isNightMode && style.night_input_wrapper
              }`}
            >
              <h2>
                Name <span>*</span>
              </h2>
              <label>This can be changed in Space settings.</label>
              <input
                type="text"
                value={spaceName}
                onChange={(e) => {
                  setSpaceName(e.target.value);
                }}
              />
              {isGroupExist && (
                <label style={{ color: "red" }}>Group name already taken</label>
              )}
            </div>
            <div
              className={`${style.input_wrapper} ${
                isNightMode && style.night_input_wrapper
              }`}
            >
              <h2>
                Brief description <span>*</span>
              </h2>
              <label>
                Include a few keywords to show people what to expect if they
                join.
              </label>
              <input
                type="text"
                value={descriptionContent}
                onChange={(e) => {
                  setDescriptionContent(e.target.value);
                }}
              />
            </div>
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
                    setPostImage("");
                  }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={style.create_space_footer}>
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
            disabled={
              spaceName && descriptionContent && postImage ? false : true
            }
            className={`${style.create_space_btn} ${
              spaceName && descriptionContent && postImage
                ? style.active_btn
                : ""
            }`}
            onClick={handleCreateSpace}
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CreateSpaceModal;
