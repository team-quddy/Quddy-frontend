import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavList = ({ open, setOpen }: Props) => {
  const navigate = useNavigate();

  const onNavigate = (location: string) => {
    navigate(location);
    setOpen(false);
  };

  return (
    <TopNavListComponent open={open} onClick={() => setOpen((pre) => !pre)}>
      <div onClick={(e) => e.stopPropagation()}>
        <li onClick={() => onNavigate("/template")}>문제집 템플릿</li>
        <li onClick={() => onNavigate("/exam")}>MY 문제집 목록</li>
        <li onClick={() => onNavigate("/edit")}>새 문제집 만들기</li>
        <li onClick={() => onNavigate("/notice")}>공지사항</li>
        <li onClick={() => onNavigate("/report")}>버그 리포트</li>
      </div>
    </TopNavListComponent>
  );
};

const TopNavListComponent = styled.div<{ open: boolean }>`
  transition: all 200ms;
  pointer-events: ${(props) => (props.open ? "auto" : "none")};
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.open ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0)")};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  & > div {
    transition: all 500ms;
    width: 100%;
    max-width: 240px;
    height: 100%;
    background-color: var(--color-theme);
    transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};

    font-size: 14px;
    padding: 108px 32px 80px;

    & > * {
      margin-bottom: 16px;
      padding: 8px 0;
      display: block;
    }
  }
`;

export default TopNavList;
