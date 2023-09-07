import { styled } from "styled-components";
import { ExamType } from "../../../types/types";
import { TbLock, TbLockOpen, TbShare2 } from "react-icons/tb";

interface Props {
  exam: ExamType;
}

const ExamItem = ({ exam }: Props) => {
  return (
    <ExamItemComponent>
      <div>
        <img src={exam.thumbnail} />
        <button>
          <TbShare2 />
        </button>

        <div>
          <span>{exam.isPublic ? "공개" : "비공개"}</span>
          {exam.isPublic ? <TbLockOpen /> : <TbLock />}
        </div>
      </div>
      <p>{exam.title}</p>
    </ExamItemComponent>
  );
};

const ExamItemComponent = styled.div`
  width: 120px;

  & > p {
    margin: 8px 0 0;
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
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

    /* 공유버튼 */
    & > button {
      right: 8px;
      top: 8px;
      background: rgba(0, 0, 0, 0.3);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      padding-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #ffffff;
    }

    /* 공개여부 */
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
        margin-left: 4px;
        font-size: 14px;
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

export default ExamItem;
