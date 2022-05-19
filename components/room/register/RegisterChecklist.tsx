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
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterChecklist: React.FC = () => {
  const name = useSelector((state) => state.register.name);

  const dispatch = useDispatch();

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setName(event?.target.value));
  };

  return (
    <Container>
      <h2>이름</h2>
      <h3>last step</h3>
      <div className="register-room-title-description-wrapper">
        <Input
          label="당신의 이름 혹은 팀 이름은?"
          value={name}
          onChange={onChangeName}
        />
      </div>
      <RegisterFooter
        prevHref="/room/register/photo"
        nextHref="/room/register/checklist"
      />
    </Container>
  );
};

export default RegisterChecklist;
