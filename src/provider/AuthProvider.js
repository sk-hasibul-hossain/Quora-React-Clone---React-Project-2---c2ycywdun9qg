import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = sessionStorage.getItem("userToken");
  const isUserLogin = token ? true : false;
  const [isLogin, setIsLogin] = useState(isUserLogin);
  const [isPostAndQuestionOpen, setIsPostAndQuestionOpen] = useState();
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState();
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [hidePostStatus, setHidePostStatus] = useState();
  const [isSearch, setIsSearch] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        isPostAndQuestionOpen,
        setIsPostAndQuestionOpen,
        isCreatedModalOpen,
        setIsCreatedModalOpen,
        isCreateSpaceModalOpen,
        setIsCreateSpaceModalOpen,
        isNewPost,
        setIsNewPost,
        hidePostStatus,
        setHidePostStatus,
        isSearch,
        setIsSearch,
        isNightMode,
        setIsNightMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const usePostAndQuestionModalStatus = () => {
  return useContext(AuthContext);
};

export const useCreatedModal = () => {
  return useContext(AuthContext);
};

export const useCreateSpaceModal = () => {
  return useContext(AuthContext);
};

export const useNewPostStatus = () => {
  return useContext(AuthContext);
};

export const useHidePostStatus = () => {
  return useContext(AuthContext);
};

export const useNightMode = () => {
  return useContext(AuthContext);
};
