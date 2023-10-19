import React, { ReactNode } from "react";
import { styled } from "styled-components";

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
}

const RoundButton = ({ type, onClick, className, children }: Props) => {
  return (
    <ButtonComponent type={type} className={className} onClick={onClick}>
      {children}
    </ButtonComponent>
  );
};

const ButtonComponent = styled.button`
  display: block;
  background-color: var(--color-primary);
  color: #fff;
  font-family: Hanamdaum;
  font-weight: bold;
  font-size: 24px;
  border: 0;
  border-radius: 36px;
  width: auto;
  padding: 0 36px;
  line-height: 72px;
`;

export default RoundButton;
