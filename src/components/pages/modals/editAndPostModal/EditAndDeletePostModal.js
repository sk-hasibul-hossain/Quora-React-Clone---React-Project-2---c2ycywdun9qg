import React from "react";
import style from "./EditAndDeletePostModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const EidtAndPostModal = ({
  setIsEditPostModalOpen,
  setPostEditPostDetails,
  post,
  deletePostAPI,
}) => {
  const handleDeletePost = () => {
    deletePostAPI(post?._id);
  };
  return (
    <div className={style.edit_and_delete_post_modal_container}>
      <div
        className={style.post_edit_btn}
        onClick={() => {
          setIsEditPostModalOpen(true);
          setPostEditPostDetails(post);
          // console.log(post);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        Edit
      </div>
      <div className={style.post_delete_btn} onClick={handleDeletePost}>
        <FontAwesomeIcon icon={faTrash} />
        Delete
      </div>
      <div className={style.post_edit_delete_triangle}></div>
      <div className={style.post_edit_delete_triangle_overLay}></div>
    </div>
  );
};

export default EidtAndPostModal;
