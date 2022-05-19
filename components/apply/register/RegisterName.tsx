import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerActions } from "../../../store/register";
import palette from "../../../styles/palette";
import Input from "../../common/Input";
import RegisterFooter from "./RegisterFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
  h3 {
    font-size: 22px;
    font-weight: bold;
    color: ${palette.main_color};
    margin-bottom: 6px;
  }
  h2 {
    font-size: 32px;
    font-weight: 400;
    color: ${palette.main_color};
    margin-bottom: 36px;
  }
  .register-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterName: React.FC = () => {
  const name = useSelector((state) => state.register.name);

  const dispatch = useDispatch();

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setName(event?.target.value));
  };

  const isValid = useMemo(() => {
    if (!name) {
      return false;
    }
    return true;
  }, [name]);

  return (
    <Container>
      <h3>LAST STEP</h3>
      <h2>팀 이름을 정해주세요.</h2>
      <div className="register-title-description-wrapper">
        <Input
          label="당신의 이름 혹은 팀 이름은?"
          value={name}
          onChange={onChangeName}
          isValid={name !== ""}
          errorMessage="please fill input"
        />
      </div>
      <RegisterFooter
        isValid={isValid}
        prevHref="/apply/register/photo"
        nextHref="/apply/register/checklist"
      />
    </Container>
  );
};

export default RegisterName;
