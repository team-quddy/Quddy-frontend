import { styled } from "styled-components";

const Loading = () => {
  return (
    <LoadingComponent>
      <svg>
        <circle cx="50%" cy="50%" r="24" fill="none" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </LoadingComponent>
  );
};

const LoadingComponent = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    60% {
      transform: rotate(540deg);
      stroke-dashoffset: 150;
    }
    100% {
      transform: rotate(1080deg);
      stroke-dashoffset: 300;
    }
  }
  width: 100%;
  height: 160px;
  overflow: hidden;
  & > svg {
    width: 100%;
    opacity: 0.5;
    stroke-dasharray: 150;
    stroke: var(--color-primary);
    animation: spin 1500ms linear infinite;
  }
`;

export default Loading;
