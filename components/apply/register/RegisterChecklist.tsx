import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerActions } from "../../../store/register";
import palette from "../../../styles/palette";
import Input from "../../common/Input";
import RegisterFooter from "./RegisterFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterChecklist: React.FC = () => {
  const register = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setName(event?.target.value));
  };

  return (
    <Container>
      <p className="register-checklist-info">
        등록한 후에 언제든지 수정 가능
        <ul>
          <li>숙소 유형</li>
        </ul>
      </p>
    </Container>
  );
};

export default RegisterChecklist;
