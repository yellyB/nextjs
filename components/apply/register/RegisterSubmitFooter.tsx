import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { registerAPI } from "../../../lib/api/apply";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import { registerActions } from "../../../store/register";
import { RootState } from "../../../store";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  min-width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  disabled?: boolean;
}

const RegisterSubmitFooter: React.FC<IProps> = ({ disabled }) => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const register = useSelector((state: RootState) => state.register);

  const dispatch = useDispatch();
  const router = useRouter();

  const onClickRegister = async () => {
    const registerBody = {
      ...register,
      userId: userId,
    };
    try {
      await registerAPI(registerBody);
      alert("등록하였습니다.");
      dispatch(registerActions.setInit());
      router.push("/");
    } catch (e) {
      console.log(e);
      // alert(e.response.data);
    }
  };

  return (
    <Container>
      <Link href="/apply/register/name">
        <a className="register-footer-back">
          {/* <BackArrowIcon /> */}
          {"<"} 뒤로
        </a>
      </Link>
      <Button
        onClick={onClickRegister}
        color="bittersweet"
        width="102px"
        disabled={disabled}
      >
        등록하기
      </Button>
    </Container>
  );
};

export default RegisterSubmitFooter;
