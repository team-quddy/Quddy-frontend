import styled from "styled-components";
import Loading from "./Loading";

interface Props {
  fade?: boolean;
}

const LoadingPage = ({ fade = true }: Props) => {
  return (
    <LoadingComponent className={fade ? "fade" : ""}>
      <Loading />
    </LoadingComponent>
  );
};

const LoadingComponent = styled.div`
  position: fixed;
  z-index: 10000;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* backdrop-filter: blur(2px); */
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  &.fade {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
export default LoadingPage;
