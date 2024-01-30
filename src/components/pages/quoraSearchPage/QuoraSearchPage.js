import React, { useEffect, useState } from "react";
import style from "./QuoraSearchPage.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  useHidePostStatus,
  useNewPostStatus,
  useNightMode,
} from "../../../provider/AuthProvider";
import { BarLoader } from "../../assets/loader/barLoader/BarLoader";
import QuoraHomeFeedCard from "../cards/quoraHomeFeedCard/QuoraHomeFeedCard";
import EditPostModal from "../modals/editPostModal/EditPostModal";

const QuoraSearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { isNightMode } = useNightMode();

  //   const { isNewPost } = useNewPostStatus();
  const { hidePostStatus, isSearch } = useHidePostStatus();
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

  const searchAPI = async (sVal) => {
    try {
      setIsLoading(true);
      const headers = {
        projectID: "c2ycywdun9qg",
      };
      const uriEncoded = encodeURIComponent(JSON.stringify({ title: sVal }));
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/post?search=${uriEncoded}`,
        { headers }
      );
      const rData = response.data.data;
      // setSearchResult(rData);
      setPostLikeDataLocalStorage(rData);
      setPostData(rData);
      //   console.log(rData);
    } catch (err) {
      console.log("Error", err);
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
        const searchingValue = decodeURIComponent(query.get("sval"));
        searchAPI(searchingValue);
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
  }, [isSearch, hidePostStatus, updatePost, postDeleteId]);

  //   useEffect(() => {
  //     if (query.get("sval")) {

  //       //   console.log(searchingValue);
  //       //   searchAPI(searchingValue);
  //     }
  //   }, []);
  return (
    <div
      className={`${style.search_outer_container} ${
        isNightMode && style.night_color
      }`}
    >
      <div className={style.search_inner_container}>
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

export default QuoraSearchPage;
