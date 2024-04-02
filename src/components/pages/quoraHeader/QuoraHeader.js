import React, { useEffect, useRef, useState } from "react";
import style from "./QuoraHeader.module.css";
// import "./QuoraHeader.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBell,
  faGlobe,
  faHouse,
  faMagnifyingGlass,
  faPenToSquare,
  faRectangleList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useCreateSpaceModal,
  useCreatedModal,
  useNightMode,
  usePostAndQuestionModalStatus,
} from "../../../provider/AuthProvider";
import QuestionAndPostCreateModal from "../modals/questionAndPostCreateModal/QuestionAndPostCreateModal";
import CreatedModal from "../modals/createdModal/CreatedModal";
import LanguageModal from "../modals/languageModal/LanguageModal";
import UserProfileModal from "../modals/userProfileModal/UserProfileModal";
import CreateSpaceModal from "../modals/createSpaceModal/CreateSpaceModal";
const QuoraHeader = () => {
  // const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();
  const [userSortName, setUserSortName] = useState();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [searchingValue, setSearchingValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchAreaOpen, setIsSearchAreaOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const boxLanguageRef = useRef();
  const boxProfileRef = useRef();
  const inputRefOne = useRef();
  const inputRefTwo = useRef();
  const notificationRef = useRef();
  const profileModalRef = useRef();

  const { isPostAndQuestionOpen, setIsPostAndQuestionOpen } =
    usePostAndQuestionModalStatus();
  const { isCreatedModalOpen, setIsCreatedModalOpen, setIsSearch } =
    useCreatedModal();
  const { isCreateSpaceModalOpen, setIsCreateSpaceModalOpen } =
    useCreateSpaceModal();
  const { isNightMode } = useNightMode();

  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setUserSortName(splitNameArr[0]?.substring(0, 1));
  };

  const handleClickOutside = (e) => {
    // console.log(profileModalRef.current, "divition", e.target);
    if (boxLanguageRef.current && !boxLanguageRef.current.contains(e.target)) {
      setIsLanguageModalOpen(false);
    }
    if (
      boxProfileRef.current &&
      profileModalRef.current &&
      !boxProfileRef.current.contains(e.target) &&
      !profileModalRef.current.contains(e.target)
    ) {
      setIsUserProfileOpen(false);
    }

    if (
      inputRefOne &&
      inputRefTwo &&
      !inputRefOne.current?.contains(e.target) &&
      !inputRefTwo.current?.contains(e.target)
    ) {
      setIsSearchAreaOpen(false);
    }
  };

  useEffect(() => {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    if (uData) {
      // setUserDetails(uData);
      converShortUserName(uData?.name);
    }

    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const searchAPI = async (sVal) => {
    try {
      if (sVal) {
        const headers = {
          projectID: "c2ycywdun9qg",
        };
        const uriEncoded = encodeURIComponent(JSON.stringify({ title: sVal }));
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/quora/post?search=${uriEncoded}`,
          { headers }
        );
        const rData = response.data.data?.slice(0, 5);
        setSearchResult(rData);
        // console.log(rData);
      } else {
        setSearchResult([]);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleSearchValue = (e) => {
    setSearchingValue(e.target.value);
    searchAPI(e.target.value);
  };
  return (
    <div
      className={`${style.quora_header_container} ${
        isNightMode && style.night_color
      }`}
    >
      <div className={style.quora_header_inner_container}>
        <div className={style.quora_upper_header_mobile_view_division}>
          <div className={style.quora_header_logo}>
            <img
              src="https://seeklogo.com/images/Q/quora-logo-2E2DD559F2-seeklogo.com.png"
              alt="logo-not-loaded"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className={style.quora_header_search_wrapper_mobile}>
            <div className={style.quora_header_search_input}>
              <input
                type="text"
                placeholder="Search quora"
                value={searchingValue}
                onChange={handleSearchValue}
                ref={inputRefOne}
                onClick={(e) => {
                  setIsSearchAreaOpen(true);
                }}
                onKeyDownCapture={(e) => {
                  if (e.key === "Enter") {
                    setIsSearch((prev) => !prev);
                    navigate(
                      `/search?sval=${encodeURIComponent(searchingValue)}`
                    );
                  }
                }}
              />
              <FontAwesomeIcon
                className={style.search_icon}
                icon={faMagnifyingGlass}
              />
            </div>
            {isSearchAreaOpen && (
              <div
                className={style.quora_search_area_container}
                ref={inputRefTwo}
              >
                {searchResult?.length < 1 ? (
                  <div className={style.no_search_found}>
                    No search result found
                  </div>
                ) : (
                  searchResult?.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className={style.quora_searc_area_card}
                        onClick={() => {
                          setIsSearch((prev) => !prev);
                          navigate(`/search?sval=${element.title}`);
                        }}
                      >
                        {element.images[0] ? (
                          <div className={style.quora_search_avatar_image}>
                            <img src={element.images[0]} />
                          </div>
                        ) : (
                          <div className={style.quora_search_avatar}>
                            {element?.author?.name.split("")[0]}
                          </div>
                        )}
                        <label>{element.title}</label>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
        <div className={style.quora_header_mobile_view_division}>
          <div className={style.quora_header_icons}>
            <div className={style.quora_header_icon}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive
                    ? `${style.quora_header_nav_link} ${style.header_active}`
                    : style.quora_header_nav_link;
                }}
                // activeClassName={style.header_active}
              >
                <FontAwesomeIcon icon={faHouse} />
              </NavLink>
            </div>
            <div className={style.quora_header_icon}>
              <NavLink
                to="/following"
                className={({ isActive }) => {
                  return isActive
                    ? `${style.quora_header_nav_link} ${style.header_active}`
                    : style.quora_header_nav_link;
                }}
                // activeClassName={style.header_active}
              >
                <FontAwesomeIcon icon={faRectangleList} />
              </NavLink>
            </div>
            <div className={style.quora_header_icon}>
              <NavLink
                to="/answer"
                className={({ isActive }) => {
                  return isActive
                    ? `${style.quora_header_nav_link} ${style.header_active}`
                    : style.quora_header_nav_link;
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </NavLink>
            </div>
            <div className={style.quora_header_icon}>
              <NavLink
                to="/spaces"
                className={({ isActive }) => {
                  return isActive
                    ? `${style.quora_header_nav_link} ${style.header_active}`
                    : style.quora_header_nav_link;
                }}
              >
                <FontAwesomeIcon icon={faUsers} />
              </NavLink>
            </div>
            <div className={style.quora_header_icon}>
              <NavLink
                className={style.quora_header_nav_link}
                ref={notificationRef}
                onClick={() => {
                  setIsNotificationOpen((prev) => !prev);
                }}
              >
                <FontAwesomeIcon icon={faBell} />
              </NavLink>
              {isNotificationOpen && (
                <div className={style.notification_container}>
                  <div className={style.notification_title}>
                    <h2>Notification</h2>
                  </div>
                  <label>No notification found</label>
                </div>
              )}
            </div>
            <div className={style.quora_header_input_area}>
              <div className={style.quora_header_search_wrapper}>
                <div className={style.quora_header_search_input}>
                  <input
                    type="text"
                    placeholder="Search quora"
                    value={searchingValue}
                    onChange={handleSearchValue}
                    ref={inputRefOne}
                    onClick={(e) => {
                      setIsSearchAreaOpen(true);
                    }}
                    onKeyDownCapture={(e) => {
                      if (e.key === "Enter") {
                        setIsSearch((prev) => !prev);
                        navigate(
                          `/search?sval=${encodeURIComponent(searchingValue)}`
                        );
                      }
                    }}
                  />
                  <FontAwesomeIcon
                    className={style.search_icon}
                    icon={faMagnifyingGlass}
                  />
                </div>
                {isSearchAreaOpen && (
                  <div
                    className={style.quora_search_area_container}
                    ref={inputRefTwo}
                  >
                    {searchResult?.length < 1 ? (
                      <div className={style.no_search_found}>
                        No search result found
                      </div>
                    ) : (
                      searchResult?.map((element, index) => {
                        return (
                          <div
                            key={index}
                            className={style.quora_searc_area_card}
                            onClick={() => {
                              setIsSearch((prev) => !prev);
                              navigate(`/search?sval=${element.title}`);
                            }}
                          >
                            {element.images[0] ? (
                              <div className={style.quora_search_avatar_image}>
                                <img src={element.images[0]} />
                              </div>
                            ) : (
                              <div className={style.quora_search_avatar}>
                                {element?.author?.name.split("")[0]}
                              </div>
                            )}
                            <label>{element.title}</label>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
              <div className={style.quora_header_plus_membership}>
                try Quora+
              </div>
              <div className={style.user_profile_area}>
                <button
                  className={style.quora_header_user_avatar}
                  ref={boxProfileRef}
                  onClick={() => {
                    setIsUserProfileOpen((prev) => !prev);
                  }}
                >
                  {userSortName}
                </button>
                {isUserProfileOpen && (
                  <UserProfileModal ref={profileModalRef} />
                )}
              </div>
              <div className={style.header_language_input}>
                <button
                  className={style.header_language_btn}
                  ref={boxLanguageRef}
                  onClick={() => {
                    setIsLanguageModalOpen((prev) => !prev);
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} />
                </button>
                {isLanguageModalOpen && <LanguageModal />}
              </div>
              <div className={style.header_question_and_post_input}>
                <div
                  className={style.header_question_btn}
                  onClick={() => {
                    setIsPostAndQuestionOpen("question");
                  }}
                >
                  Add question
                </div>
                <FontAwesomeIcon
                  className={style.header_post_input_down_arrow}
                  icon={faAngleDown}
                  onClick={() => {
                    setIsPostAndQuestionOpen("post");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPostAndQuestionOpen && (
        <QuestionAndPostCreateModal
          isPostAndQuestionOpen={isPostAndQuestionOpen}
          setIsPostAndQuestionOpen={setIsPostAndQuestionOpen}
        />
      )}
      {isCreatedModalOpen && (
        <CreatedModal
          setIsCreatedModalOpen={setIsCreatedModalOpen}
          isCreatedModalOpen={isCreatedModalOpen}
        />
      )}
      {isCreateSpaceModalOpen && (
        <CreateSpaceModal
          setIsCreateSpaceModalOpen={setIsCreateSpaceModalOpen}
        />
      )}
    </div>
  );
};

export default QuoraHeader;
