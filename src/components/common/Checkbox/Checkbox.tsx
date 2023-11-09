import { ChangeEvent } from "react";
import { styled } from "styled-components";

interface Props {
  value: boolean;
  setValue(bool?: boolean): void;
  id: string;
  label?: string;
}

const Checkbox = ({ id, value, setValue, label }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return (
    <CheckboxComponent>
      <input id={id} type="checkbox" defaultChecked={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
      <label htmlFor={id} className={`checkbox ${value ? "checked" : ""}`} />
    </CheckboxComponent>
  );
};

const CheckboxComponent = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  & > input {
    position: absolute;
    visibility: hidden;
  }
  & .checkbox {
    margin-left: 8px;
    border: 2px solid var(--color-gray);
    border-radius: 4px;
    width: 16px;
    height: 16px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      background-color: var(--color-primary);
      border-radius: 2px;
      width: 10px;
      height: 10px;
      transform: scale(0) rotate(360deg);
      transition: all 250ms;
    }

    &.checked::after {
      transform: scale(1);
    }
  }
  & label {
    font-size: 12px;
  }
`;

export default Checkbox;
