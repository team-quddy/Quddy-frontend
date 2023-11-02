import { styled } from "styled-components";
import Image from "../../../../assets/imgs/quddy_sad.png";

const ExamEmpty = () => {
  return (
    <ExamEmptyComponent>
      <img alt="우는 큐디" src={Image} />
      <p>아직 만든 문제집이 없어요</p>
    </ExamEmptyComponent>
  );
};

const ExamEmptyComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
    max-width: 100px;
    margin: 32px 0 12px;
  }
  & p {
    text-align: center;
    color: var(--color-primary);
    font-size: 12px;
  }
`;

export default ExamEmpty;
