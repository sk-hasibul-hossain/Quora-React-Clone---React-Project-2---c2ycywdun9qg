import React, { useEffect, useState } from "react";
import style from "./Group.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { images } from "../assets/image/images";
import { useNightMode } from "../../provider/AuthProvider";

const Group = () => {
  const { isNightMode } = useNightMode();
  const [groupDetails, setGroupDetails] = useState();
  const [imageArray, setImageArray] = useState(images);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [spaceId, setSpaceId] = useState(query.get("spaceId"));
  const [imageId, setImageId] = useState(query.get("imId"));
  const [userSortName, setUserSortName] = useState();
  const [uId, setUId] = useState(query.get("uid"));
  const [groupTitle, setGroupTitle] = useState("post");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setUserSortName(splitNameArr[0]?.substring(0, 1));
  };

  const getGropsAPI = async (userId, token) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        projectID: "c2ycywdun9qg",
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/channel/`,
        { headers }
      );
      const groupAllData = response.data.data;
      const filteredData = groupAllData?.filter((group) => {
        return group._id.localeCompare(spaceId) === 0;
      });
      setGroupDetails(filteredData[0]);
      converShortUserName(filteredData[0].owner.name);
      setIsAdmin(filteredData[0].owner._id.localeCompare(userId) === 0);
      // console.log(filteredData[0]);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    if (uData && token) {
      getGropsAPI(uData?.id, token);
    }
    const groupFollow = JSON.parse(localStorage.getItem("followedGroups"));
    if (groupFollow) {
      const isAvailable = groupFollow?.find((id) => {
        return id.localeCompare(spaceId) === 0;
      });
      if (isAvailable) {
        setIsFollowed(true);
      }
    }
  }, []);

  const handleFollow = () => {
    const getLocalData = JSON.parse(localStorage.getItem("followedGroups"));
    localStorage.removeItem("followedGroups");
    if (isFollowed) {
      if (getLocalData) {
        const data = getLocalData.filter((element) => {
          return element.localeCompare(spaceId) !== 0;
        });
        // localStorage.setItem("followedGroups", JSON.stringify(data));
      }
    } else {
      if (getLocalData) {
        getLocalData.push(spaceId);
        localStorage.setItem("followedGroups", JSON.stringify(getLocalData));
      } else {
        localStorage.setItem("followedGroups", JSON.stringify([spaceId]));
      }
    }
    setIsFollowed((prev) => !prev);
  };
  return (
    <div className={style.group_container}>
      <div className={style.group_cover_photo_container}>
        {/* <div className=""></div> */}
        <img src={imageArray[imageId]} />
        <div className={style.group_cover_header}>
          <div className={style.group_cover_body}>
            <div className={style.section}>
              <div className={style.group_image}>
                <img src={groupDetails?.image} />
              </div>
            </div>
            <div className={style.title_area}>
              <div className={style.title_wrapper}>
                <h1>{groupDetails?.name}</h1>
                <h2>{groupDetails?.description}</h2>
                <label>1 Contributors 0 followers</label>
              </div>
              <div className={style.icon_area}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                    class="icon_svg-stroke"
                    stroke-width="1.5"
                    stroke="#fff"
                    fill="none"
                  ></path>
                </svg>
                {isAdmin ? (
                  <>
                    <div className={style.admin_icon_btn_one}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          class="icon_svg-stroke"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19 17.2238V17.8519C19 18.2104 18.7095 18.5 18.3502 18.5H5.64977C5.29108 18.5 5 18.2113 5 17.8519V17.2238C5 16.9555 5.11104 16.7044 5.30205 16.5239C5.31309 16.5116 5.32463 16.4996 5.33664 16.4881C5.35109 16.4742 5.37707 16.4486 5.40833 16.4174C5.47145 16.3545 5.53903 16.2854 5.60908 16.2122C5.82705 15.9842 6.03317 15.7535 6.21879 15.5283C6.38873 15.3222 6.53505 15.1282 6.65514 14.9495C6.79508 14.7413 6.89584 14.5588 6.9537 14.4113C7.0516 14.1616 7.13048 13.7018 7.1774 13.0898C7.21761 12.5653 7.23283 11.9785 7.22532 11.413C7.22329 11.3566 7.22226 11.3001 7.22224 11.2471C7.22581 8.61806 9.3644 6.5 12 6.5C14.6356 6.5 16.7742 8.61806 16.7777 11.2305C16.7777 11.3001 16.7767 11.3566 16.7749 11.4054C16.7672 11.9785 16.7824 12.5653 16.8226 13.0898C16.8695 13.7018 16.9484 14.1616 17.0463 14.4113C17.1042 14.5588 17.2049 14.7413 17.3449 14.9495C17.4649 15.1282 17.6113 15.3222 17.7812 15.5283C17.9668 15.7535 18.173 15.9842 18.3909 16.2122C18.461 16.2854 18.5285 16.3545 18.5917 16.4174C18.6229 16.4486 18.6489 16.4742 18.6634 16.4881C18.6739 16.4982 18.684 16.5086 18.6938 16.5193C18.8874 16.6999 19 16.9529 19 17.2238Z"
                          ></path>
                          <path d="M12 6.5C12.8284 6.5 13.5 5.82843 13.5 5C13.5 4.17157 12.8284 3.5 12 3.5C11.1716 3.5 10.5 4.17157 10.5 5C10.5 5.82843 11.1716 6.5 12 6.5Z"></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.0001 21.2501C13.3808 21.2501 14.5001 20.1307 14.5001 18.75C14.5386 18.75 9.49506 18.75 9.5 18.75C9.5 20.1307 10.6193 21.2501 12.0001 21.2501Z"
                          ></path>
                          <path d="M6 6C5.01308 6.95218 4.63439 7.62965 4.25 9"></path>
                          <path d="M18 6C18.9869 6.95218 19.3656 7.62965 19.75 9"></path>
                        </g>
                      </svg>
                    </div>
                    <div className={style.admin_icon_btn_two}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3.5c.779 1.167 1.779 2 3 2.5s2.555.333 4-.5v9a7.856 7.856 0 0 1-2.5 3.5c-1.167.945-2.667 1.778-4.5 2.5-1.833-.722-3.333-1.555-4.5-2.5A7.856 7.856 0 0 1 5 14.5v-9c1.549.8 2.882.967 4 .5 1.118-.467 2.118-1.3 3-2.5Zm-7 9.781 14-7.525M7 17.441 18.655 11"
                          stroke="#fff"
                          stroke-width="1.5"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <label>Admin</label>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m5 8.5 7 7 7.005-7"
                          stroke="#fff"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div className={style.admin_icon_btn_three}></div>
                  </>
                ) : (
                  <>
                    <div className={style.button_two}>
                      <svg viewBox="0 0 25 25" fill="none">
                        <path
                          d="M16.322 12.55v-.005h1.371v-1.04h-1.479a3.742 3.742 0 01-2.072-.699 3.756 3.756 0 01.488-2.246l-.005-.003.686-1.188-.9-.52-.74 1.281a3.757 3.757 0 01-1.633 1.448 3.755 3.755 0 01-1.71-1.549l-.005.003-.685-1.188-.9.52.74 1.281a3.77 3.77 0 01.436 2.138 3.759 3.759 0 01-2.195.706v.005H6.346v1.04h1.48a3.76 3.76 0 012.07.69 3.754 3.754 0 01-.487 2.265l.005.003-.686 1.188.901.52.74-1.281a3.76 3.76 0 011.636-1.448c.692.314 1.297.84 1.706 1.549l.005-.003.686 1.188.901-.52-.74-1.281a3.759 3.759 0 01-.437-2.139 3.763 3.763 0 012.196-.705z"
                          class="icon_svg-fill_as_stroke"
                          fill="white"
                        ></path>
                        <path
                          d="M17.02 19.52h5m-2.5-2.5v5"
                          class="icon_svg-stroke"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M20.383 7.191a4.756 4.756 0 00-4.204-2.375 4.751 4.751 0 00-8.318 0 4.754 4.754 0 00-4.159 7.204 4.753 4.753 0 004.16 7.204 4.75 4.75 0 004.158 2.453c.91 0 1.766-.273 2.503-.732a2.79 2.79 0 01-.124-2.616l-.049-.032a2.7 2.7 0 01-4.869-.449l-.172-.1-.9-.52-.165-.095a2.703 2.703 0 01-2.814-1.308 2.704 2.704 0 01.274-3.091v-1.429a2.702 2.702 0 012.54-4.399l.172-.099.901-.52.163-.095a2.703 2.703 0 012.54-1.783c1.14 0 2.152.716 2.54 1.783l.172.099.901.52.164.095a2.703 2.703 0 012.814 1.308c.57.987.456 2.221-.274 3.091v1.429c.386.46.595 1.022.626 1.595.18-.037.365-.06.556-.06.547 0 1.055.162 1.484.438a4.742 4.742 0 00-.666-2.688 4.746 4.746 0 00.046-4.828z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                    <div className={style.subsribe_btn} onClick={handleFollow}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 19.5h-6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v6M8 12.5v-4h4v4H8zM14.5 9H16h-1.5zm0 3H16h-1.5zM8 15.5h8-8zm9 4h5M19.5 17v5"
                          stroke="#fff"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <label>{isFollowed ? "Followed" : "Follow"}</label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${style.group_body} ${
          isNightMode && style.night_group_body
        }`}
      >
        <div className={style.group_inner_body}>
          <div className={style.section_one}>
            <div className={style.group_body_title}>
              <div
                className={`${style.group_body_title_item} ${
                  groupTitle === "about" && style.group_body_title_item_active
                } ${isNightMode && style.group_body_title_item_night}`}
                onClick={() => {
                  setGroupTitle("about");
                }}
              >
                About
              </div>
              <div
                className={`${style.group_body_title_item} ${
                  groupTitle === "post" && style.group_body_title_item_active
                } ${isNightMode && style.group_body_title_item_night}`}
                onClick={() => {
                  setGroupTitle("post");
                }}
              >
                Posts
              </div>
              {!isAdmin && (
                <div
                  className={`${style.group_body_title_item} ${
                    groupTitle === "question" &&
                    style.group_body_title_item_active
                  } ${isNightMode && style.group_body_title_item_night}`}
                  onClick={() => {
                    setGroupTitle("question");
                  }}
                >
                  Questions
                </div>
              )}
            </div>
            {groupTitle === "about" ? (
              <div className={style.group_about}>
                <div
                  className={`${style.group_about_title} ${style.night_group_about_title}`}
                >
                  <h2>Details</h2>
                </div>
                <div
                  className={`${style.about_details} ${
                    isNightMode && style.night_about_details
                  }`}
                >
                  <ul>
                    <li>To provide guidelines to the engineering community</li>
                    <li>
                      To provide information on advances in the engineering
                      industry
                    </li>
                    <li>Career opportunities and related information</li>
                    <li>
                      Increase the employability of Indian engineering students
                    </li>
                    <li>
                      To improve the life skills for the engineering freshers
                    </li>
                    <li>Personality development</li>
                    <li>
                      To improve the employability and placement for freshers
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className={style.group_post_area}>
                <div
                  className={`${style.group_post_title} ${
                    isNightMode && style.night_group_post_title
                  }`}
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
                      stroke-linecap="round"
                    >
                      <path d="m20 8-7.523 7.372-3.908-3.83L3 17"></path>
                      <path d="M15 7h6v6"></path>
                    </g>
                  </svg>
                  <label>Recent</label>
                </div>
              </div>
            )}
            {groupTitle !== "about" && (
              <div
                className={`${style.group_posts} ${
                  isNightMode && style.night_group_posts
                }`}
              >
                {groupTitle === "post" && "No posts"}
                {groupTitle === "question" && "No questions"}
              </div>
            )}
          </div>
          <div className={style.section_two}>
            {groupTitle !== "about" && (
              <>
                <div
                  className={`${style.contribitor_area} ${
                    isNightMode && style.night_contribitor_area
                  }`}
                >
                  <div
                    className={`${style.contribitor_area_title} ${style.night_contribitor_area_title}`}
                  >
                    1 Contributors
                  </div>
                  <div
                    className={`${style.contribitor_area_body} ${
                      isNightMode && style.night_contribitor_area_body
                    }`}
                  >
                    {groupDetails?.owner?.profileImage ? (
                      <div className={style.quora_header_user_avatar_image}>
                        <img src={groupDetails?.owner?.profileImage} />
                      </div>
                    ) : (
                      <div className={style.quora_header_user_avatar}>
                        {userSortName}
                      </div>
                    )}
                    <h3>{groupDetails?.owner?.name}</h3>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3.5c.779 1.167 1.779 2 3 2.5s2.555.333 4-.5v9a7.856 7.856 0 0 1-2.5 3.5c-1.167.945-2.667 1.778-4.5 2.5-1.833-.722-3.333-1.555-4.5-2.5A7.856 7.856 0 0 1 5 14.5v-9c1.549.8 2.882.967 4 .5 1.118-.467 2.118-1.3 3-2.5Zm-7 9.781 14-7.525M7 17.441 18.655 11"
                        stroke="#666"
                        stroke-width="1.5"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <label>user details</label>
                  </div>
                </div>
              </>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
