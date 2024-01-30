import React from "react";
import style from "./Quora.module.css";
import LeftSideBar from "../pages/leftSideBar/LeftSideBar";
import MiddleBar from "../pages/middleBar/MiddleBar";
import RightSideBar from "../pages/rightSideBar/RightSideBar";
import { useNightMode } from "../../provider/AuthProvider";
// import QuoraHeader from "../pages/quoraHeader/QuoraHeader";
// import QuestionAndPostCreateModal from "../pages/modals/questionAndPostCreateModal/QuestionAndPostCreateModal";
// import { usePostAndQuestionModalStatus } from "../../provider/AuthProvider";
const Qura = () => {
  // const { isPostAndQuestionOpen, setIsPostAndQuestionOpen } =
  //   usePostAndQuestionModalStatus();
  const { isNightMode } = useNightMode();
  return (
    <div
      className={`${style.quora_outer_container} ${
        isNightMode && style.night_color
      }`}
    >
      <div className={style.quora_inner_container}>
        <section className={style.left_side_bar_section}>
          <LeftSideBar />
        </section>
        <section className={style.middle_bar_section}>
          <MiddleBar />
        </section>
        <section className={style.right_side_bar_section}>
          <RightSideBar />
        </section>
      </div>
      {/*isPostAndQuestionOpen && (
        <QuestionAndPostCreateModal
          isPostAndQuestionOpen={isPostAndQuestionOpen}
          setIsPostAndQuestionOpen={setIsPostAndQuestionOpen}
        />
      )*/}
    </div>
  );
};
export default Qura;
