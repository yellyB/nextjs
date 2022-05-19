import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray_b0};
    border-radius: 4px;
    font-size: 16px;
    /* outline: none; */
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      /* border-color: ${palette.main_color} !important; */
    }
  }
  svg {
    position: absolute;
    right: 11px;
    top: 13px;
    width: 20px;
    height: 20px;
  }
  label {
    span {
      display: block;
      font-size: 16px;
      color: ${palette.gray_76};
      font-weight: 600;
      margin-bottom: 8px;
    }
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        &:focus {
          border-color: ${palette.orange};
        }
      }
    `}

  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.main_color};
      }
    `}
`;

// input 태그가 가지는 속성에 대한 타입.... 을 확장
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: JSX.Element;
  isValid?: boolean; // 입력 되었는지 여부
  useValidation?: boolean; // 유효성 검사 사용할건지?
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  label,
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}
      {icon}
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

// 인풋 값 변경시마다 렌더링 방지. memo사용
export default React.memo(Input);
