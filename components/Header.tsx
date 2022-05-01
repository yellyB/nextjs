import React, { useState } from "react";
import styled from "styled-components";
import LogoIcon from "../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import Link from "next/link";
import palette from "../styles/palette";
import SignUpModal from "./auth/SignUpModal";
import ModalPortal from "./ModalPortal";
import useModal from "../hooks/useModal";

const Container = styled.div`
  position: sticky; // header를 맨 위 고정
  /* top: 0; */
  width: 100%;
  /* height: 80px; */
  display: flex;
  justify-content: space-between; // 양쪽 끝으로 정렬
  /* align-items: center; */
  padding: 0 80px;
  /* background-color: white; */
  /* box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px; */
  /* z-index: 10; */
  .header-logo-wrapper {
    /* display: flex; */
    /* align-items: center; */
    .header-logo {
      /* margin-right: 6px; */
      width: 60px;
      height: 60px;
    }
    .header-logo-text {
      width: 60px;
      height: 60px;
    }
  }

  /* 헤더 로그인 회원가입  */
  .header-auth-buttons {
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
    .header-login-button {
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
  }
`;

const Header: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <LogoIcon className="header-logo" />
          <LogoTextIcon className="header-logo-text" />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button className="header-signup-button" onClick={openModal}>
          SignUp
        </button>
        <button className="header-login-button">SignIn</button>
      </div>
      <ModalPortal>
        <SignUpModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
