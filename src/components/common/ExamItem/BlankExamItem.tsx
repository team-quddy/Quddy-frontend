import { styled } from "styled-components";

const BlankExamItem = () => {
  return (
    <BlankExamItemComponent>
      <div />
      <p></p>
    </BlankExamItemComponent>
  );
};

const BlankExamItemComponent = styled.div`
  width: 120px;

  & > p {
    display: block;
    width: 80%;
    height: 16px;
    margin: 8px 0 0;
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    border-radius: 4px;
    background-color: var(--color-gray);
  }
  & > div {
    background-color: var(--color-gray);
    position: relative;
    width: 100%;
    aspect-ratio: 0.75;
    border-radius: 8px;
    overflow: hidden;
  }

  & * {
    background: linear-gradient(-45deg, var(--color-gray) 40%, #eee 50%, var(--color-gray) 60%);
    background-size: 400% 400%;
    animation: blink 1s ease infinite;
  }

  @keyframes blink {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default BlankExamItem;
