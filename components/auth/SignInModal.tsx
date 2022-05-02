import React, { useEffect, useMemo, useState } from "react";
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
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { commonActions } from "../../store/common";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";
import { authActions } from "../../store/auth";

const Container = styled.form`
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
  .signin-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .signin-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    /* border-bottom: 1px solid ${palette.gray_eb}; */
  }
  .signin-modal-set-signup {
    /* color: ${palette.dark_cyan}; */
    /* margin-left: 8px; */
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const PASSWORD_MIN_LENGTH = 8;

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  // useMemo로 재연산 방지
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  // 비밀번호가 숫자, 특수기호 둘 중 하나 포함?
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  const validateSignUpForm = () => {
    if (!isPasswordOverMinLength || isPasswordHasNumberOrSymbol) return false;

    return true;
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // dispatch(commonActions.setValidateMode(true));
    setValidateMode(true); // 위를 커스텀 훅 만들어서 변경

    if (!validateSignUpForm()) return;
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="email"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          // useValidation
          // isValid={!!email}
          // errorMessage="please fill email input"
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
          // onFocus={onFocusPassword}
          // useValidation
          // isValid={isPasswordOverMinLength && !isPasswordHasNumberOrSymbol}
          // errorMessage="please fill password input"
        />
      </div>
      <div className="signin-modal-submit-button-wrapper">
        <Button type="submit">Sign In</Button>
      </div>
      <span
        className="signin-modal-set-signup"
        role="presentation"
        onClick={changeToSignUpModal}
      >
        Sign Up
      </span>
    </Container>
  );
};

export default SignInModal;
