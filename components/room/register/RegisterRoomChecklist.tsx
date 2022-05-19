import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Input from "../../common/Input";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const name = useSelector((state) => state.registerRoom.name);

  const dispatch = useDispatch();

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setName(event?.target.value));
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
      <RegisterRoomFooter
        prevHref="/room/register/photo"
        nextHref="/room/register/checklist"
      />
    </Container>
  );
};

export default RegisterRoomChecklist;
