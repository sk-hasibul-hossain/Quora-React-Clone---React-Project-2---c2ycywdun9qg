import React, { useEffect, useState } from "react";
import style from "./LeftSideBar.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCreatedModal, useNightMode } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCreateSpaceModal } from "../../../provider/AuthProvider";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { isNightMode } = useNightMode();
  const { setIsCreateSpaceModalOpen } = useCreateSpaceModal();
  const { isCreatedModalOpen } = useCreatedModal();
  const [groups, setGroups] = useState();
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
      // const filteredData = groupAllData.filter((group) => {
      //   return group.owner._id.localeCompare(uId) === 0;
      // });
      // console.log(filteredData);
      setGroups(groupAllData);
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
  }, [isCreatedModalOpen]);
  return (
    <div className={style.left_side_bar_container}>
      <div className={style.items}>
        <div
          className={`${style.item} ${style.left_bar_active} ${
            isNightMode && style.night_color
          }`}
          onClick={() => {
            setIsCreateSpaceModalOpen(true);
          }}
        >
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <label>Create Space</label>
        </div>
        {groups?.map((group, index) => {
          return (
            <div
              key={index}
              className={`${style.item} ${isNightMode && style.night_color}`}
              onClick={() => {
                navigate(
                  `/group?spaceId=${group._id}&uid=${group.owner._id}&imId=${
                    index % 8
                  }`
                );
              }}
            >
              <span>
                <img src={group?.image} alt={group?.name} />
              </span>
              <label>{group?.name}</label>
            </div>
          );
        })}
        {/* <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-ti-541-50-clznlnijqoogpezffokxndilbeorjqvp.jpeg"
              alt="Android icon"
            />
          </span>
          <label>Android Fans</label>
        </div>
        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-ti-1577993-50-uxkdpnvstukdgfoueowwrazpyjholwlk.jpeg"
              alt="Science and technology icon"
            />
          </span>
          <label>Science and Technology</label>
        </div>

        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-ti-2313-50-kcenlbmxgbzfatzpvxxyspsyuvatzift.jpeg"
              alt="Indian Engg. Educaion icon"
            />
          </span>
          <label>Indian Engg. Educaion</label>
        </div>
        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-t-1978-100-R8q9yWpMPBqq2PNalousWjlz2ewHeDnW.jpeg"
              alt="Technology Trends icon"
            />
          </span>
          <label>Technology Trends</label>
        </div>
        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-t-1513-100-ktlxdyfyihixtydnlisznwdcywqmteyp.jpeg"
              alt="Algorithms icon"
            />
          </span>
          <label>Algorithms</label>
        </div>
        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-t-40375-100-qguthmoqwdjzwyrxbdxiajedxdhtykkl.jpeg"
              alt="Mobile Technology icon"
            />
          </span>
          <label>Mobile Technology</label>
        </div>
        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-t-809-100-cjrjydalfqieuyrezyvyzdvqgilynfqe.jpeg"
              alt="Software Engineering icon"
            />
          </span>
          <label>Software Engineering</label>
        </div>
        <div className={style.item}>
          <span>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-t-5059-100-KTRAjA7gapzvxZurtGgpzIrlVWAkVKga.jpeg"
              alt="Learning to prpgram icon"
            />
          </span>
          <label>Learning to prpgram</label>
        </div> */}
      </div>
      <div className={style.left_side_bar_footer}>
        About . Careers . TermsPrivacy . Acceptable UseAdvertise . PressYour Ad
        Choices . Grievance . Officer
      </div>
    </div>
  );
};

export default LeftSideBar;
