import React, { useEffect, useState } from "react";
import style from "./middleBar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShareDeskBox from "../shareDeskBox/ShareDeskBox";
import QuoraHomeFeedCard from "../cards/quoraHomeFeedCard/QuoraHomeFeedCard";
import { getHeaderWithProjectID } from "../../../utills/services";
import { BarLoader } from "../../assets/loader/barLoader/BarLoader";
import {
  useHidePostStatus,
  useNewPostStatus,
} from "../../../provider/AuthProvider";
import EditPostModal from "../modals/editPostModal/EditPostModal";

const MiddleBar = () => {
  const navigate = useNavigate();
  const { isNewPost } = useNewPostStatus();
  const { hidePostStatus } = useHidePostStatus();
  // const [userDetails, setUserDetails] = useState();
  const [userSortName, setUserSortName] = useState();
  const [userFullName, setUserFullName] = useState();
  const [postEditPostDetails, setPostEditPostDetails] = useState();
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [updatePost, setUpdatePost] = useState();
  const [postDeleteId, setPostDeleteId] = useState();

  const setPostLikeDataLocalStorage = (postData) => {
    const posts = postData.map((post, index) => {
      return {
        postIndex: index,
        uId: post?._id,
        upVote: post?.likeCount,
        downVote: post?.dislikeCount,
        liked: false,
        disliked: false,
      };
    });
    localStorage.setItem("postLikes", JSON.stringify(posts));
  };

  const orderigPost = (posts) => {
    posts.sort((a, b) => {
      new Date(b.createdAt) - new Date(a.createdAt);
    });
    return posts;
  };

  const getPostData = async () => {
    try {
      setIsLoading(true);
      const auth = getHeaderWithProjectID();
      const appName = "quora";
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/${appName}/post?limit=100`,
        auth
      );
      // console.log(orderigPost(response.data.data));
      const responseData = response.data.data;
      const orderData = orderigPost(responseData);
      setPostLikeDataLocalStorage(orderData);
      setPostData(orderData);
    } catch (err) {
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setUserSortName(splitNameArr[0]?.substring(0, 1));
  };

  useEffect(() => {
    localStorage.removeItem("postLikes");
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    if (uData) {
      // setUserDetails(uData);
      // console.log("In useEffect");
      if (!hidePostStatus || !postData) {
        getPostData();
        converShortUserName(uData?.name);
        setUserFullName(uData?.name);
      } else {
        setPostData(
          postData?.filter(
            (element) => element?._id.localeCompare(hidePostStatus) !== 0
          )
        );
      }
    }
  }, [isNewPost, hidePostStatus, updatePost, postDeleteId]);
  return (
    <div className={style.middle_bar_container}>
      <ShareDeskBox userSortName={userSortName} />
      <div className={style.quora_home_feeds}>
        {isLoading ? (
          <BarLoader />
        ) : (
          postData?.map((post, index) => {
            return (
              <QuoraHomeFeedCard
                key={index}
                post={post}
                index={index}
                setIsEditPostModalOpen={setIsEditPostModalOpen}
                setPostEditPostDetails={setPostEditPostDetails}
                setPostDeleteId={setPostDeleteId}
                userSortName={userSortName}
              />
            );
          })
        )}
      </div>
      {isEditPostModalOpen && (
        <EditPostModal
          setIsEditPostModalOpen={setIsEditPostModalOpen}
          userFullName={userFullName}
          userSortName={userSortName}
          setPostEditPostDetails={setPostEditPostDetails}
          postEditPostDetails={postEditPostDetails}
          setUpdatePost={setUpdatePost}
        />
      )}
    </div>
  );
};

export default MiddleBar;
