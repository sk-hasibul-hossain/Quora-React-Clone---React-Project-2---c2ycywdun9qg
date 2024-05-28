import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import axios from "axios";
import SignupModal from "../signupModal/SignupModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import IsLoading from "../Loading/IsLoading";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";
import { getHeaderWithProjectID } from "../../../utills/services";

const Login = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isEmailError, setIsEmailError] = useState(false);
  const [isShowPassowrd, setIsShowPassword] = useState(false);

  const [isError, setIsError] = useState();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { isLogin, setIsLogin } = useAuth();

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };
  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const loginUser = async (email, passwordOne) => {
    try {
      const auth = getHeaderWithProjectID();
      const appType = {
        "Content-Type": "application/json",
        appType: "quora",
      };
      const payLoad = {
        email: email,
        password: passwordOne,
        ...appType,
      };
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/login",
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
      // console.log("Error", err, err.message);
      setIsError(err?.message);
    }
  };

  const handleLogin = () => {
    // console.log(email, password);
    loginUser(email, password);
  };

  useEffect(() => {
    // console.log("login page", state);
    if (isLogin) {
      // navigate(state?.prevPath);
      navigate("/");
    }
  }, []);

  const callWarning = () => {
    alert("This functionality is yet to be implemented");
  };
  return (
    <div className={style.login_container}>
      <div className={style.inner_login_container}>
        <div className={style.login_header}>
          <img
            src="https://seeklogo.com/images/Q/quora-logo-2E2DD559F2-seeklogo.com.png"
            alt="logo-not-loaded"
          />
          <h1>A place to share knowledge and better understand the world</h1>
        </div>
        {/*<div className={style.back_to_home_btn}>
          <span>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
            <label>Back to home</label>
          </span>
        </div>*/}
        <div className={style.login_body}>
          <div className={style.login_body_section_one}>
            <h2>
              By continuing you indicate that you agree to Quora’s{" "}
              <span>Terms of Service</span> and <span>Privacy Policy.</span>
            </h2>
            <div className={style.login_with_area}>
              <section onClick={callWarning}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill-rule="evenodd"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="icon_svg-fill_as_stroke"
                    d="M20.16 12.193c0-.603-.054-1.182-.155-1.739H12v3.288h4.575a3.91 3.91 0 0 1-1.696 2.565v2.133h2.747c1.607-1.48 2.535-3.659 2.535-6.248z"
                    fill="#4285f4"
                  ></path>
                  <path
                    class="icon_svg-fill_as_stroke"
                    d="M12 20.5c2.295 0 4.219-.761 5.625-2.059l-2.747-2.133c-.761.51-1.735.811-2.878.811-2.214 0-4.088-1.495-4.756-3.504h-2.84v2.202A8.497 8.497 0 0 0 12 20.5z"
                    fill="#34a853"
                  ></path>
                  <path
                    class="icon_svg-fill_as_stroke"
                    d="M7.244 13.615A5.11 5.11 0 0 1 6.977 12a5.11 5.11 0 0 1 .267-1.615V8.183h-2.84C3.828 9.33 3.5 10.628 3.5 12s.328 2.67.904 3.817l2.84-2.202z"
                    fill="#fbbc05"
                  ></path>
                  <path
                    class="icon_svg-fill_as_stroke"
                    d="M12 6.881c1.248 0 2.368.429 3.249 1.271l2.438-2.438C16.215 4.342 14.291 3.5 12 3.5a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202C7.912 8.376 9.786 6.881 12 6.881z"
                    fill="#ea4335"
                  ></path>
                </svg>
                <label>Continue with Google</label>
              </section>
              <section onClick={callWarning}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="icon_svg-fill_as_stroke"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.5 12a8.5 8.5 0 1 0-9.83 8.397v-5.94H8.513v-2.458h2.159v-1.872c0-2.13 1.269-3.307 3.21-3.307.93 0 1.903.166 1.903.166v2.091h-1.072c-1.056 0-1.385.656-1.385 1.328V12h2.358l-.377 2.457h-1.98v5.94A8.503 8.503 0 0 0 20.5 12Z"
                    fill="#1877F2"
                  ></path>
                </svg>
                <label>Continue with Facebook</label>
              </section>
              <button onClick={openSignupModal}>Sign up with email</button>
            </div>
          </div>
          <div className={style.login_body_section_two}>
            <div className={style.login_area}>
              <label>Login</label>
              <div className={style.input_wrapper}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={() => {
                    if (!email?.includes("@")) {
                      setIsEmailError(true);
                    } else {
                      setIsEmailError(false);
                    }
                  }}
                />
                {isEmailError && (
                  <label className={style.error}>
                    Please Enter a valid Email
                  </label>
                )}
              </div>
              <div className={style.input_wrapper}>
                <label>Password</label>
                <section>
                  <input
                    type={isShowPassowrd ? "text" : "password"}
                    name="password"
                    placeholder="Your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                <span className={style.error}>
                  {isError &&
                    (isError == "Request failed with status code 401"
                      ? "Wrong email or password"
                      : isError === "Network Error"
                      ? "Network Error"
                      : "Your account not found")}
                </span>
              </div>
              <div className={`${style.input_submit_section}`}>
                <label>Forgot password?</label>
                <button
                  className={
                    email &&
                    password &&
                    email?.includes("@") &&
                    style.login_btn_active
                  }
                  disabled={
                    email && password && email?.includes("@") ? false : true
                  }
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.login_footer}>
          About . Careers . Privacy . Terms . Contact . Language . Your ad
          Choices . Press . © Quora, Inc. 2024
        </div>
      </div>
      {isSignupModalOpen && (
        <div className={style.modal_outer_container}>
          <SignupModal closeSignupModal={closeSignupModal} />
        </div>
      )}
      {isLoading && <IsLoading setIsLoading={setIsLoading} />}
    </div>
  );
};

export default Login;
