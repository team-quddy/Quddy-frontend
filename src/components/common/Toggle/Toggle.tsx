import { styled } from "styled-components";

interface Prop {
  value: boolean;
  setValue(bool: boolean): void;
}

const Toggle = ({ value, setValue }: Prop) => {
  return <ToggleComponent className={`${value}`} onClick={() => setValue(!value)} />;
};

const ToggleComponent = styled.button`
  background-color: var(--color-primary);
  width: 48px;
  height: 24px;
  border-radius: 12px;
  border: none;
  overflow: hidden;
  position: relative;
  transition: all 200ms;
  &::after {
    transition: all 500ms;
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));
    background-color: var(--color-theme);
    position: absolute;
    top: 3px;
    right: 3px;
  }
  &.false {
    background-color: var(--color-gray);
  }
  &.false::after {
    margin-right: 24px;
  }
`;

export default Toggle;
