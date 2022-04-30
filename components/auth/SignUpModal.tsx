import React, { useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/close_icon.svg";
import MailIcon from "../../public/static/svg/modal/email.svg";
import PersonIcon from "../../public/static/svg/modal/person.svg";
import EyeOpendIcon from "../../public/static/svg/modal/eye_closed.svg";
import EyeClosedIcon from "../../public/static/svg/modal/eye_opend.svg";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Selector from "../common/Selector";
import useModal from "../../hooks/useModal";

const Container = styled.div`
  width: 568px;
  /* height: 614px; */
  padding: 32px;
  background-color: white;
  z-index: 11;
  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .signup-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .signup-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .signup-modal-birthday-year-selector {
      margin-right: 16px;
      width: 33%;
    }
    .signup-modal-birthday-month-selector {
      margin-right: 16px;
      width: 33%;
    }
    .signup-modal-birthday-day-selector {
      width: 33%;
    }
  }
  .signup-modal-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .signup-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  return (
    <Container>
      Sign Up
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="email"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="id"
          icon={<PersonIcon />}
          value={id}
          onChange={onChangeId}
        />
      </div>
      <div className="input-wrapper signup-password-input-wrapper ">
        <Input
          placeholder="password"
          type={hidePassword ? "password" : "input"}
          icon={
            hidePassword ? (
              <EyeOpendIcon onClick={toggleHidePassword} />
            ) : (
              <EyeClosedIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="input-wrapper signup-password-input-wrapper ">
        <Input
          placeholder="password confirm"
          type={hidePassword ? "password" : "input"}
          icon={
            hidePassword ? (
              <EyeOpendIcon onClick={toggleHidePassword} />
            ) : (
              <EyeClosedIcon onClick={toggleHidePassword} />
            )
          }
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
      </div>
      <div className="signup-modal-birthday-selectors">
        <div className="signup-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={["year"]}
            defaultValue="year"
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
        <div className="signup-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={["month"]}
            defaultValue="month"
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="signup-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={["day"]}
            defaultValue="day"
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
      </div>
    </Container>
  );
};

export default SignUpModal;
