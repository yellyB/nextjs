import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
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
  .modal-title {
    display: flex;
    h2 {
      font-size: 28pt;
      /* color: ${palette.charcoal}; */
      margin-left: 8px;
    }
    .modal-close-x-icon {
      cursor: pointer;
      /* display: block; */
      margin: 0 0 40px auto;
    }
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
  .signup-modal-submit-button-wrapper {
    /* margin-bottom: 16px; */
    padding-bottom: 16px;
    /* border-bottom: 1px solid ${palette.gray_eb}; */
  }
  .signup-modal-set-signin {
    font-weight: 600;
    color: ${palette.bittersweet};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const PASSWORD_MIN_LENGTH = 8;

// 최적화를 위해 불변으로 관리
const disabledYears = ["Year"];
const disabledMonth = ["Month"];
const disabledDays = ["Day"];

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const changeToSignInModal = () => {
    dispatch(authActions.setAuthMode("signin"));
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
    if (!email || !password) return false;

    if (!isPasswordOverMinLength || isPasswordHasNumberOrSymbol) return false;

    if (!birthYear || !birthMonth || !birthDay) return false;

    return true;
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 페이지 리로딩 방지

    // dispatch(commonActions.setValidateMode(true));
    setValidateMode(true); // 위를 커스텀 훅 만들어서 변경

    if (!validateSignUpForm()) return;

    try {
      const signUpBody = {
        email,
        password,
        passwordConfirm,
        birthday: new Date(
          `${birthYear}-${birthMonth}-${birthDay}`
        ).toUTCString(),
      };
      //   console.log(signUpBody);
      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
      closeModal();
    } catch (e) {
      console.log("e:", e);
      // alert(e.response.data);
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmitSignUp}>
      <div className="modal-title">
        <h2>SIGN UP</h2>
        <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="email"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="please fill email input"
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
          onFocus={onFocusPassword}
          useValidation
          isValid={isPasswordOverMinLength && !isPasswordHasNumberOrSymbol}
          errorMessage="please fill password input"
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordOverMinLength}
            text="password must atleast 8 length"
          />
          <PasswordWarning
            isValid={!isPasswordHasNumberOrSymbol}
            text="password must contain number or symbol"
          />
        </>
      )}
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
          useValidation
          isValid={!!passwordConfirm}
          errorMessage="please fill password confirm input"
        />
      </div>
      <div className="signup-modal-birthday-selectors">
        <div className="signup-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={disabledYears}
            defaultValue="year"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
        <div className="signup-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={disabledMonth}
            defaultValue="month"
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="signup-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={disabledDays}
            defaultValue="day"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
      </div>
      <div className="signup-modal-submit-button-wrapper">
        <Button type="submit" color="bittersweet">
          Sign Up
        </Button>
      </div>
      <span
        className="signup-modal-set-signin"
        role="presentation"
        onClick={changeToSignInModal}
      >
        Sign In
      </span>
    </Container>
  );
};

export default SignUpModal;
