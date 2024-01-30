import React, { useRef, useState } from "react";
import style from "./SignupModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { getHeaderWithProjectID } from "../../../utills/services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";

const SignupModal = ({ closeSignupModal }) => {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [isShowPassowrd, setIsShowPassword] = useState(false);
  const [isShowReEnterPassowrd, setIsShowReEnterPassword] = useState(false);

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const [isError, setIsError] = useState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [passwordOne, setPasswordOne] = useState();
  const [passwordTwo, setPasswordTwo] = useState();

  const emailRef = useRef();
  const passwordOneRef = useRef();
  const passwordTwoRef = useRef();

  const navigate = useNavigate();
  const { setIsLogin } = useAuth();

  const handleReset = () => {
    setIsPasswordSectionOpen(false);
    setIsShowPassword(false);
    setIsShowReEnterPassword(false);

    setIsPasswordError(false);
    setIsEmailError(false);

    setName("");
    setEmail("");
    setPasswordOne("");
    setPasswordTwo("");
  };

  const handleBackButton = () => {
    setIsPasswordSectionOpen(false);
    handleReset();
  };

  const createUser = async (name, email, passwordOne) => {
    try {
      const auth = getHeaderWithProjectID();
      const appType = {
        "Content-Type": "application/json",
        appType: "quora",
      };
      const payLoad = {
        name: name,
        email: email,
        password: passwordOne,
        ...appType,
      };
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/signup",
        payLoad,
        auth
      );
      // console.log(response.data);
      const token = response.data.token;
      if (token) {
        const userData = response.data.data.user;
        sessionStorage.setItem("userToken", JSON.stringify(token));
        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            id: userData._id,
            name: userData.name,
            email: userData.email,
          })
        );
        setIsLogin(true);
        setIsError("");
        navigate("/");
      }
    } catch (err) {
      console.log("Error", err, err.message);
      setIsError(err?.message);
    }
  };

  const handleCreateAccount = () => {
    createUser(name, email, passwordOne);
  };

  return (
    <div className={style.signup_modal_container}>
      <div className={style.signup_modal_body}>
        {isPasswordSectionOpen ? (
          <span className={style.back_span}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={handleBackButton} />
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                closeSignupModal();
                handleReset();
              }}
            />
          </span>
        ) : (
          <span className={style.cross_span}>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                closeSignupModal();
                handleReset();
              }}
            />
          </span>
        )}
        <h2>Sign up</h2>
        {isPasswordSectionOpen ? (
          <>
            <div className={style.password_input_wrapper}>
              <label>Password</label>
              <section>
                <input
                  type={isShowPassowrd ? "text" : "password"}
                  name="password"
                  placeholder="Your Password"
                  ref={passwordOneRef}
                  onChange={(e) => {
                    setPasswordOne(e.target.value);
                  }}
                />

                <FontAwesomeIcon
                  className={style.hide_eye}
                  icon={isShowPassowrd ? faEye : faEyeSlash}
                  onClick={() => {
                    setIsShowPassword((prev) => !prev);
                  }}
                />
              </section>
            </div>
            <div className={style.password_input_wrapper}>
              <label>Re-enter Password</label>
              <section>
                <input
                  type={isShowReEnterPassowrd ? "text" : "password"}
                  name="reEnterPassword"
                  placeholder="Re-enter your password"
                  ref={passwordTwoRef}
                  onChange={(e) => {
                    setPasswordTwo(e.target.value);
                  }}
                  onBlur={() => {
                    if (passwordOne && passwordOne !== passwordTwo) {
                      passwordOneRef.current.style.border = "1px solid red";
                      passwordTwoRef.current.style.border = "1px solid red";
                      setIsPasswordError(true);
                    } else {
                      passwordOneRef.current.style.border = "1px solid #c9c9c9";
                      passwordTwoRef.current.style.border = "1px solid #c9c9c9";
                      setIsPasswordError(false);
                    }
                  }}
                />
                <FontAwesomeIcon
                  className={style.hide_eye}
                  icon={isShowReEnterPassowrd ? faEye : faEyeSlash}
                  onClick={() => {
                    setIsShowReEnterPassword((prev) => !prev);
                  }}
                />
              </section>
              <span className={style.error}>
                {isPasswordError && "Entered password is not matched"}
                {isError &&
                  (isError === "Request failed with status code 403"
                    ? "Already account exist"
                    : "Network Error")}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className={style.input_wrapper}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="What would you like to be call"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className={style.input_wrapper}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                ref={emailRef}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={() => {
                  // console.log(email?.includes("@"));
                  if (!email?.includes("@")) {
                    emailRef.current.style.border = "1px solid red";
                    setIsEmailError(true);
                  } else {
                    emailRef.current.style.border = "1px solid #c9c9c9";
                    setIsEmailError(false);
                  }
                }}
              />
              <span className={style.error}>
                {isEmailError && "Enter a valid Email"}
              </span>
            </div>
          </>
        )}
      </div>
      <div className={style.signup_footer}>
        {isPasswordSectionOpen ? (
          <button
            className={`${style.register_button} ${
              passwordOne &&
              passwordTwo &&
              passwordOne === passwordTwo &&
              style.btn_active
            }`}
            disabled={
              passwordOne && passwordTwo && passwordOne === passwordTwo
                ? false
                : true
            }
            onClick={handleCreateAccount}
          >
            Register
          </button>
        ) : (
          <button
            className={`${style.next_button} ${
              name && email && email?.includes("@") && style.btn_active
            }`}
            disabled={name && email && email?.includes("@") ? false : true}
            onClick={() => {
              setIsPasswordSectionOpen(true);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
