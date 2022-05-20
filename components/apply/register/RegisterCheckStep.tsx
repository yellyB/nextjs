import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import Link from "next/link";
import CheckMarkIcon from "../../../public/static/svg/register/check_mark.svg";

const Container = styled.li`
  display: flex;
  padding: 16px 0;
  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    span {
      font-size: 24px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
  .register-check-step-in-progress {
    margin-left: 28px;
  }
  .register-check-step-continue-button {
    margin: 8px 0 0 28px;
  }
  .disabled-step {
    margin-left: 28px;
    font-size: 24px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  disabled?: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

// inProgress 있으면 계속 진행
const RegisterCheckStep: React.FC<IProps> = ({
  disabled,
  inProgress,
  step,
  href,
}) => {
  if (inProgress) {
    return (
      <Container>
        <Link href={href}>
          <a className="register-check-step-in-progress">
            <span>{step}</span>
          </a>
        </Link>
        <Link href={href}>
          <a className="register-check-step-continue-button">
            <Button size="small" width="58px">
              계속
            </Button>
          </a>
        </Link>
      </Container>
    );
  }

  if (disabled) {
    return (
      <Container>
        <p className="disabled-step">{step}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Link href={href}>
        <a>
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterCheckStep;
