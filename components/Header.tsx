import React from "react";
import styled from "styled-components";
import LogoIcon from "../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import Link from "next/link";
import { useSelector } from "../store";
import HeaderUserProfile from "./HeaderUserProfile";
import HeaderAuths from "./HeaderAuths";
import palette from "../styles/palette";

const Container = styled.div`
  position: sticky; // header를 맨 위 고정
  /* top: 0; */
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between; // 양쪽 끝으로 정렬
  align-items: center;
  padding: 0 30px;
  background-color: ${palette.sub_main_color};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 12px;
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

  .header-logo-wrapper + div {
    position: relative;
  }
`;

const Header: React.FC = () => {
  // 리팩토링 전에는 user를 불러왔었는데
  // 현재는 로그인/비로그인 상태(원시값)만 가져와서 객체가 새로 만들어질때마다 렌더링 방지
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <LogoIcon className="header-logo" />
          <LogoTextIcon className="header-logo-text" />
        </a>
      </Link>
      {isLogged ? <HeaderUserProfile /> : <HeaderAuths />}
    </Container>
  );
};

export default Header;
