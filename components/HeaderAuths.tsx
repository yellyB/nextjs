import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import AuthModal from "./auth/AuthModal";
import useModal from "../hooks/useModal";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import Button from "./common/Button";

const Container = styled.div`
  margin: 8px 8px 0 0;
  .header-signup-button {
    height: 42px;
    margin-right: 8px;
    padding: 0 16px;
    color: ${palette.black};
    border: 1px solid ${palette.gray_c4};
    border-radius: 21px;
    background-color: white;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    /* outline: none; */
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
  .header-signin-button {
    height: 42px;
    padding: 0 16px;
    color: ${palette.black};
    border: 1px solid ${palette.gray_c4};
    border-radius: 21px;
    background-color: white;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
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
        SIGN UP
      </button>
      <button
        className="header-signin-button"
        onClick={() => openModalOnClick("signin")}
      >
        SIGN IN
      </button>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;
