import { useEffect, useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { styled } from "styled-components";
import { StretchHeightEvent } from "../../../types/event";

interface Props {
  className?: string;
  children: JSX.Element[];
}

const Accordion = ({ className = "", children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;
    if (open) divRef.current.style.height = divRef.current.scrollHeight + "px";
    else divRef.current.style.height = "40px";

    const target = divRef.current;

    function onChangeHeight(this: HTMLElement, e: CustomEvent<StretchHeightEvent>) {
      console.dir(e);
      this.style.height = this.scrollHeight + e.detail.height + "px";
    }

    target.addEventListener("stretchHeight", onChangeHeight);

    return () => {
      target.removeEventListener("stretchHeight", onChangeHeight);
    };
  }, [open]);

  const onToggle = () => setOpen((pre) => !pre);

  return (
    <AccordionComponent ref={divRef} className={`${open ? " " : " close "}${className}`}>
      <div className="header" onClick={onToggle}>
        {children[0]}
        <TbChevronDown />
      </div>
      <div className="body">{children[1]}</div>
    </AccordionComponent>
  );
};

const AccordionComponent = styled.div`
  border-radius: 8px;
  background-color: var(--color-theme);
  overflow: hidden;
  transition: height 0.5s;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25);

  & > .header {
    min-height: 40px;
    width: calc(100% - 16px);
    transition: max-height 1s;
    margin: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    & > *:first-child {
      flex: 1 1 0;
      word-break: break-all;
      white-space: pre-wrap;
      font-size: 14px;
    }

    & > svg {
      flex-shrink: 0;
      flex-basis: content;
      color: var(--color-primary);
      font-size: 32px;
      margin: 4px 4px 4px 8px;
    }
  }
  & > .body {
    border-top: 1px solid var(--color-gray);
    margin: 0 8px;
  }

  &.close > .header > svg {
    transform: rotateX(180deg);
  }
  &.close {
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;

    & > .header {
      max-height: 40px;

      & > *:first-child {
        flex: 1 1 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export default Accordion;
