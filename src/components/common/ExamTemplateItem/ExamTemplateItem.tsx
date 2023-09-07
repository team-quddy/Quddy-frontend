import { styled } from "styled-components";
import { ExamTemplateType } from "../../../types/types";
import { TbGitFork } from "react-icons/tb";

interface Props {
  exam: ExamTemplateType;
}

const ExamTemplateItem = ({ exam }: Props) => {
  return (
    <ExamTemplateItemComponent>
      <div>
        <img src={exam.thumbnail} />

        <div>
          <span>{exam.scrap}</span>
          <TbGitFork />
        </div>
      </div>
      <p>{exam.title}</p>
      <span>{exam.nickname}</span>
    </ExamTemplateItemComponent>
  );
};

const ExamTemplateItemComponent = styled.div`
  & > p {
    margin: 8px 0 0;
    font-size: 14px;
    font-weight: bold;
  }
  & > span {
    font-size: 12px;
  }
  & > div {
    background-color: var(--color-gray);
    position: relative;
    width: 120px;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;

    & > * {
      position: absolute;
      z-index: 3;
    }

    /* 스크랩 수 */
    & > div {
      right: 8px;
      bottom: 8px;
      font-size: 12px;
      color: #ffffff;
      font-weight: bold;
      display: flex;
      align-items: center;

      & svg {
        padding-bottom: 1px;
        margin-left: 2px;
        font-size: 16px;
      }
    }

    & > img {
      z-index: 1;
      width: 100%;
    }
    /* 이미지 하단 페이드아웃 처림 */
    &::after {
      content: "";
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    }
  }
`;

export default ExamTemplateItem;
