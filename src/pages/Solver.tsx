import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Solver = () => {
  return (
    <SovlerComponent>
      <Outlet />
    </SovlerComponent>
  );
};

const SovlerComponent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background);

  & > main {
    max-width: 800px;
    margin: auto;
  }
`;

export default Solver;
