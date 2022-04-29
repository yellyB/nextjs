import React from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/close_icon.svg";
import MailIcon from "../../public/static/svg/modal/email.svg";
import PersonIcon from "../../public/static/svg/modal/person.svg";
import EyeOpendIcon from "../../public/static/svg/modal/eye_closed.svg";
import EyeClosedIcon from "../../public/static/svg/modal/eye_opend.svg";
import palette from "../../styles/palette";

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
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      /* border: 1px solid ${palette.gray_eb}; */
      border-radius: 4px;
      font-size: 16px;
      /* outline: none; */
      ::placeholder {
        color: ${palette.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 11px;
      width: 25px;
      height: 25px;
    }
  }
`;

const SignUpModal: React.FC = () => {
  return (
    <Container>
      Sign Up
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <input placeholder="email" type="email" name="email" />
        <MailIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="id" />
        <PersonIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="password" type="password" />
        <EyeOpendIcon />
      </div>
      <div className="input-wrapper">
        <input placeholder="password confirm" type="password" />
        <EyeOpendIcon />
      </div>
    </Container>
  );
};

export default SignUpModal;
