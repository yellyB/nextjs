import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "dark_cyan":
        return css`
          border: 2px solid ${palette.dark_cyan};
          color: ${palette.dark_cyan};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
        color: white;
      `;
    case "bittersweet":
      return css`
        background-color: ${palette.bittersweet};
        color: white;
      `;
    case "white":
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
    default:
      return css`
        background-color: ${palette.main_color};
        color: white;
      `;
  }
};

const getButtonSize = (size: "small" | "default") => {
  switch (size) {
    case "default":
      return css`
        height: 48px;
      `;
    case "small":
      return css`
        font-size: 14px;
        height: 36px;
      `;
    default:
      return "";
  }
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
  size: "small" | "default";
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || "", props.colorReverse)};
  ${(props) => getButtonSize(props.size)}

  svg {
    margin-right: 6px;
    width: 18px;
  }
`;

// input 태그가 가지는 속성에 대한 타입.... 을 확장

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "default" | "dark_cyan" | "white" | "bittersweet";
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
  size?: "small" | "default";
}

const Button: React.FC<IProps> = ({
  children,
  color = "default",
  width,
  colorReverse = false,
  icon,
  size = "default",
  ...props
}) => {
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
      size={size}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
