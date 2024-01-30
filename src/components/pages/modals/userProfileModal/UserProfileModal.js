import React, { forwardRef, useEffect, useState } from "react";
import style from "./UserProfileModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useAuth, useNightMode } from "../../../../provider/AuthProvider";

const UserProfileModal = forwardRef((props, ref) => {
  const { setIsLogin } = useAuth();
  const [userSortName, setUserSortName] = useState();
  const [userFullName, setUserFullName] = useState();
  const { isNightMode, setIsNightMode } = useNightMode();
  const converShortUserName = (name) => {
    const splitNameArr = name?.split(" ").slice(0, 2);
    setUserSortName(splitNameArr[0]?.substring(0, 1));
  };

  useEffect(() => {
    const uData = JSON.parse(sessionStorage.getItem("userData"));
    if (uData) {
      // setUserDetails(uData);
      setUserFullName(uData?.name);
      converShortUserName(uData?.name);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userData");
    setIsLogin(false);
  };
  return (
    <div className={style.user_profile_modal_container} ref={ref}>
      <div className={style.user_details_area}>
        <div className={style.quora_header_user_avatar}>{userSortName}</div>
        <div className={style.user_profile_name_area}>
          <h1>{userFullName}</h1>
          <FontAwesomeIcon className={style.right_icon} icon={faAngleRight} />
        </div>
      </div>
      <div className={style.items}>
        <div
          className={style.item}
          onClick={() => {
            setIsNightMode((prev) => !prev);
          }}
        >
          <label>Dark Mode</label>
          <button>{isNightMode ? "Off" : "On"}</button>
        </div>
        <div className={style.item} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
});

export default UserProfileModal;
