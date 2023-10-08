import styled from "styled-components";
import { TbMenu2, TbUser } from "react-icons/tb";
import TopNavList from "./TopNavList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onNavigate = (location: string) => {
    navigate(location);
    setOpen(false);
  };

  return (
    <>
      <TopNavComponent>
        <div>
          <button type="button" onClick={() => setOpen((pre) => !pre)}>
            <TbMenu2 />
          </button>
          <button type="button" className="title" onClick={() => onNavigate("/")}>
            quddy
          </button>
          <button type="button" onClick={() => onNavigate("/profile")}>
            <TbUser />
          </button>
        </div>
      </TopNavComponent>
      <TopNavList open={open} setOpen={setOpen} />
    </>
  );
};

const TopNavComponent = styled.div`
  font-size: 24px;

  width: 100%;
  height: 48px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;

  background-color: var(--color-theme);
  border-bottom: 1px solid var(--color-light-gray);

  & > div {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 800px;
  }
  & .title {
    font-family: Pacifico-Regular;
    color: var(--color-primary);
    margin-bottom: 8px;
  }
  & button {
    background: none;
    margin: 0 8px;
    border: none;
    padding: 0 12px;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 24px;
  }
`;

export default TopNav;
