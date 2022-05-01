import React from "react";
import styled from "styled-components";
import RedXIcon from "../../public/static/svg/auth/red_x_icon.svg";
import GreenCheckIcon from "../../public/static/svg/auth/blue_check_icon.svg";
import pallete from "../../styles/palette";

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? pallete.green : pallete.davidson_orange};
  line-height: 1.5;
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <GreenCheckIcon /> : <RedXIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;
