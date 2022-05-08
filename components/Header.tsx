import React, { useState } from "react";
import styled from "styled-components";
import LogoIcon from "../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import Link from "next/link";
import palette from "../styles/palette";
import AuthModal from "./auth/AuthModal";
import ModalPortal from "./ModalPortal";
import useModal from "../hooks/useModal";
import { useSelector } from "../store";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { singoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const Container = styled.div`
  position: sticky; // header를 맨 위 고정
  /* top: 0; */
  width: 100%;
  /* height: 80px; */
  display: flex;
  justify-content: space-between; // 양쪽 끝으로 정렬
  /* align-items: center; */
  padding: 0 10px;
  /* background-color: white; */
  /* box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px; */
  /* z-index: 10; */

  /* 왼쪽 로고 */
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

  /* 헤더 로그인 회원가입(비로그인 시)  */
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

  /* 헤더 우측 유저 아이콘(로그인 시) */
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 20px;
    background-color: white;
    cursor: pointer;
    /* outline: none; */
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.17);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      /* border-radius: 50%; */
    }
  }
`;

const Header: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const openModalOnClick = (type: "signup" | "signin") => {
    dispatch(authActions.setAuthMode(type));
    openModal();
  };

  const signout = async () => {
    try {
      await singoutAPI();
      dispatch(userActions.clearUser());
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <LogoIcon className="header-logo" />
          <LogoTextIcon className="header-logo-text" />
        </a>
      </Link>
      {user.isLogged ? (
        <>
          <button className="header-user-profile" type="button">
            <HamburgerIcon />
            <img
              src={user.profileImage}
              className="header-user-profile-image"
              alt=""
            />
          </button>
          <button onClick={signout}>logout</button>
        </>
      ) : (
        <div className="header-auth-buttons">
          <button
            className="header-signup-button"
            onClick={() => openModalOnClick("signup")}
          >
            Sign Up
          </button>
          <button
            className="header-login-button"
            onClick={() => openModalOnClick("signin")}
          >
            Sign In
          </button>
        </div>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
