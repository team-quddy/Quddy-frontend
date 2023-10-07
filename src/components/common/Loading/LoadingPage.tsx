import styled from "styled-components";
import Loading from "./Loading";

const LoadingPage = () => {
  return (
    <LoadingComponent>
      <Loading />
    </LoadingComponent>
  );
};

const LoadingComponent = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default LoadingPage;
