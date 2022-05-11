import React, { useState } from "react";
import styled from "styled-components";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import Link from "next/link";
import palette from "../styles/palette";
import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import { singoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const Container = styled.div`
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

  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

const HeaderUserProfile: React.FC = () => {
  // 리팩토링 전에는 user를 불러왔었는데
  // 현재는 userProfileImg를 불러와서(원시값) 객체가 새로 만들어질때마다 리렌더링 되지 않도록
  const userProfileImage = useSelector((state) => state.user.profileImage);

  const dispatch = useDispatch();

  const [isUsermenuOpend, setIsUsermenuOpend] = useState(false);

  const signout = async () => {
    try {
      await singoutAPI();
      dispatch(userActions.clearUser());
    } catch (e) {
      console.log(e.message);
    }
    setIsUsermenuOpend(false);
  };

  return (
    <Container>
      <button
        className="header-user-profile"
        type="button"
        onClick={() => setIsUsermenuOpend(!isUsermenuOpend)}
      >
        <HamburgerIcon />
        <img
          src={userProfileImage}
          className="header-user-profile-image"
          alt=""
        />
      </button>
      {isUsermenuOpend && (
        <ul className="header-usermenu">
          <li>manage</li>
          <Link href="/room/register/building">
            <a role="presentation" onClick={() => setIsUsermenuOpend(false)}>
              <li>register</li>
            </a>
          </Link>
          <div className="header-usermenu-divider" />
          <li role="presentation" onClick={signout}>
            sign out
          </li>
        </ul>
      )}
    </Container>
  );
};

export default HeaderUserProfile;
