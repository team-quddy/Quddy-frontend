import { useRef } from "react";
import { TbChevronUp } from "react-icons/tb";
import { styled } from "styled-components";

const TopBtn = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const onGoToTheTop = () => {
    if (!btnRef.current) return;
    const target = btnRef.current.parentElement as HTMLDivElement;
    target.scrollTo({
      top: 0,
    });
  };

  return (
    <TopBtnComponent type="button" ref={btnRef} onClick={onGoToTheTop}>
      <TbChevronUp />
    </TopBtnComponent>
  );
};

const TopBtnComponent = styled.button`
  box-shadow: 0 4px 16px 0px rgba(0, 0, 0, 0.5);
  color: var(--color-theme);
  background-color: var(--color-primary);
  border: none;
  border-radius: 12px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  min-height: 48px;
  aspect-ratio: 1;
  position: sticky;
  bottom: 32px;
  margin: 0 24px 24px auto;
  z-index: 10000;
`;

export default TopBtn;
