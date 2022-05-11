import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import AuthModal from "./auth/AuthModal";
import useModal from "../hooks/useModal";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Container = styled.div`
  .header-signup-button {
    height: 42px;
    margin-right: 8px;
    padding: 0 16px;
    /* border: 0; */
    /* border-radius: 21px; */
    /* background-color: white; */
    cursor: pointer;
    /* outline: none; */
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
  .header-signin-button {
    height: 42px;
    padding: 0 16px;
    /* border: 0; */
    /* box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18); */
    /* border-radius: 21px; */
    /* background-color: white; */
    cursor: pointer;
    /* outline: none; */
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
  }
`;

const HeaderAuths: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();

  const dispatch = useDispatch();

  const openModalOnClick = (type: "signup" | "signin") => {
    dispatch(authActions.setAuthMode(type));
    openModal();
  };

  return (
    <Container>
      <button
        className="header-signup-button"
        onClick={() => openModalOnClick("signup")}
      >
        Sign Up
      </button>
      <button
        className="header-signin-button"
        onClick={() => openModalOnClick("signin")}
      >
        Sign In
      </button>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;
