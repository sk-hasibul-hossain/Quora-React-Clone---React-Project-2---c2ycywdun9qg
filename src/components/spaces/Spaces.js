import React, { useEffect, useState } from "react";
import style from "./Spaces.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCreateSpaceModal, useNightMode } from "../../provider/AuthProvider";
import { images } from "../assets/image/images";

const Spaces = () => {
  const { setIsCreateSpaceModalOpen } = useCreateSpaceModal();
  const { isNightMode } = useNightMode();
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState();
  const [userId, setUserId] = useState();
  const [imageArr, setImageArr] = useState(images);
  const getGropsAPI = async (uId, token) => {
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
      setGroupDetails(groupAllData);
      setUserId(uId);
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
  }, []);
  // console.log(isNightMode);
  return (
    <div
      className={`${style.space_outer_container} ${
        isNightMode && style.night_space_outer
      }`}
    >
      <div className={style.space_inner_container}>
        <section className={style.space_row_one}>
          <div
            className={`${style.your_space_area} ${
              isNightMode && style.night_your_space_area
            }`}
          >
            <div
              className={`${style.your_space_area_header} ${
                isNightMode && style.night_your_space_area_header
              }`}
            >
              <h1>Your Space</h1>
              <div className={style.your_space_header_button}>
                <div
                  className={style.your_space_btn}
                  onClick={() => {
                    setIsCreateSpaceModalOpen(true);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.your_space_btn_svg}
                  >
                    <g stroke-width="1.5" fill="none" fill-rule="evenodd">
                      <path d="M12 7v10m-5-5h10" stroke-linecap="round"></path>
                      <circle cx="12" cy="12" r="9"></circle>
                    </g>
                  </svg>
                  <label>Create Space</label>
                </div>
                <div
                  className={`${style.your_space_btn} ${style.not_allowed_pointer}`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${style.your_space_btn_svg} ${style.not_allowed_pointer}`}
                  >
                    <g fill-rule="evenodd" fill="none">
                      <path d="M12 21c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9-4.05 9-9 9z"></path>
                      <path d="M15.233 8.036c.45-.168.9.281.73.731l-1.686 4.498c-.169.506-.562.843-1.012 1.012l-4.498 1.687a.571.571 0 0 1-.73-.731l1.686-4.498c.169-.506.562-.843 1.012-1.012l4.498-1.687zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                    </g>
                  </svg>
                  <label className={style.not_allowed_pointer}>
                    Discover Spaces
                  </label>
                </div>
              </div>
            </div>
            <div className={style.your_space_body}>
              {groupDetails?.slice(0, 4).map((element, index) => {
                return (
                  <div
                    key={index}
                    className={style.your_space_card}
                    onClick={() => {
                      navigate(
                        `/group?spaceId=${element._id}&uid=${userId}&imId=${
                          index % 8
                        }`
                      );
                    }}
                  >
                    <div
                      className={`${style.your_space_card_title_wrapper} ${
                        isNightMode && style.night_your_space_card_title_wrapper
                      }`}
                    >
                      <div className={style.your_space_image}>
                        <img src={element.image} alt={element.name} />
                      </div>
                      <h2>{element.name}</h2>
                      {element.owner._id.localeCompare(userId) === 0 && (
                        <div className={style.your_space_admin_icon}>
                          <svg
                            width="16"
                            height="16"
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
                          <lable>ADMIN</lable>
                        </div>
                      )}
                    </div>
                    {element.owner._id.localeCompare(userId) !== 0 && (
                      <div className={style.your_space_card_subscribtion_btn}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M16.322 12.55v-.005h1.371v-1.04h-1.479a3.742 3.742 0 01-2.072-.699 3.756 3.756 0 01.488-2.246l-.005-.003.686-1.188-.9-.52-.74 1.281a3.757 3.757 0 01-1.633 1.448 3.755 3.755 0 01-1.71-1.549l-.005.003-.685-1.188-.9.52.74 1.281a3.77 3.77 0 01.436 2.138 3.759 3.759 0 01-2.195.706v.005H6.346v1.04h1.48a3.76 3.76 0 012.07.69 3.754 3.754 0 01-.487 2.265l.005.003-.686 1.188.901.52.74-1.281a3.76 3.76 0 011.636-1.448c.692.314 1.297.84 1.706 1.549l.005-.003.686 1.188.901-.52-.74-1.281a3.759 3.759 0 01-.437-2.139 3.763 3.763 0 012.196-.705z"
                            class="icon_svg-fill_as_stroke"
                            fill="white"
                          ></path>
                          <path
                            d="M17.02 19.52h5m-2.5-2.5v5"
                            stroke="rgb(46, 105, 255)"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M20.383 7.191a4.756 4.756 0 00-4.204-2.375 4.751 4.751 0 00-8.318 0 4.754 4.754 0 00-4.159 7.204 4.753 4.753 0 004.16 7.204 4.75 4.75 0 004.158 2.453c.91 0 1.766-.273 2.503-.732a2.79 2.79 0 01-.124-2.616l-.049-.032a2.7 2.7 0 01-4.869-.449l-.172-.1-.9-.52-.165-.095a2.703 2.703 0 01-2.814-1.308 2.704 2.704 0 01.274-3.091v-1.429a2.702 2.702 0 012.54-4.399l.172-.099.901-.52.163-.095a2.703 2.703 0 012.54-1.783c1.14 0 2.152.716 2.54 1.783l.172.099.901.52.164.095a2.703 2.703 0 012.814 1.308c.57.987.456 2.221-.274 3.091v1.429c.386.46.595 1.022.626 1.595.18-.037.365-.06.556-.06.547 0 1.055.162 1.484.438a4.742 4.742 0 00-.666-2.688 4.746 4.746 0 00.046-4.828z"
                            class="icon_svg-fill_as_stroke"
                            fill="rgb(46, 105, 255)"
                          ></path>
                        </svg>
                        <label>Subscription available</label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`${style.space_discover} ${
              isNightMode && style.night_space_discover
            }`}
          >
            <h1>Discover Spaces</h1>
            <h2>Spaces you might like</h2>
            <div className={style.discover_space_container}>
              {groupDetails
                ?.filter?.((element) => {
                  return element.owner._id.localeCompare(userId) !== 0;
                })
                .map((element, index) => {
                  return (
                    <div
                      key={index}
                      className={`${style.discover_space_card} ${
                        isNightMode && style.night_discover_space_card
                      }`}
                      onClick={() => {
                        navigate(
                          `/group?spaceId=${element._id}&uid=${userId}&imId=${
                            index % 8
                          }`
                        );
                      }}
                    >
                      <div className={style.cover_image}>
                        <img src={imageArr[index % 8]} />
                      </div>
                      <div
                        className={`${style.discover_space_title_and_content} ${
                          isNightMode &&
                          style.night_discover_space_title_and_content
                        }`}
                      >
                        <h3>{element.name}</h3>
                        <p>{element.description}</p>
                      </div>
                      <div className={style.discover_space_image}>
                        <img src={element.image} alt={element.name} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        <section className={style.space_row_two}>
          <div
            className={`${style.pending_invations_container} ${
              isNightMode && style.night_pending_invations_container
            }`}
          >
            <div
              className={`${style.pending_invations_header} ${style.night_pending_invations_header}`}
            >
              <h2>Pending Invites</h2>
            </div>
            <label>From people you don't follow</label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Spaces;
