import { styled } from "styled-components";
import Accordion from "../../../common/Accordion/Accordion";
import { TbArrowsShuffle, TbPhotoPlus, TbTextPlus } from "react-icons/tb";
import ProblemEditExample from "./ProblemEditExample";

const ProblemEditAccordion = () => {
  return (
    <ProblemEditComponent>
      <Accordion>
        <div className="title">
          <div className="problem-no">Q 1</div>
          <input onClick={(e) => e.stopPropagation()} placeholder="질문을 작성해주세요" />
        </div>

        <div className="content">
          <h3>문제 설정</h3>
          <div className="management-area">
            <button type="button">
              <TbArrowsShuffle /> 랜덤 문제 가져오기
            </button>
            <button type="button">문제 삭제</button>
          </div>

          <h3>보기 설정</h3>
          <div className="example-area">
            <button type="button">
              <TbPhotoPlus />
              이미지 추가
            </button>
            <button type="button">
              <TbTextPlus />
              텍스트 추가
            </button>
          </div>

          <h3>선택지 설정</h3>
          <div className="option-area"></div>
        </div>
      </Accordion>
    </ProblemEditComponent>
  );
};

const ProblemEditComponent = styled.div`
  /* 상단부 스타일 */
  & .title {
    display: flex;
    margin: 8px 0;

    & .problem-no {
      width: 48px;
      padding: 8px;
      border-radius: 20px;
      background-color: var(--color-primary);
      color: var(--color-theme);
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }
    & input {
      width: 100%;
      margin-left: 4px;
      border: none;
      border-radius: 4px;
      padding: 0 8px;
      background-color: var(--color-light-gray);
      font-size: 12px;
      color: var(--color-text);

      &:focus {
        outline: 2px solid var(--color-background);
      }
      &::placeholder {
        color: var(--color-primary);
        opacity: 0.5;
      }
    }
  }
  /* 하단부 스타일 */
  & .content {
    padding: 16px;
    & h3 {
      margin-bottom: 8px;
      font-size: 14px;
    }
    & > div {
      display: grid;
      margin-bottom: 24px;
      & > button {
        font-size: 12px;
        background-color: var(--color-light-gray);
        border: none;
        border-radius: 8px;
        height: 40px;
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        & > svg {
          font-size: 24px;
        }
      }
    }

    & .management-area {
      grid-template-columns: 2fr 1fr;
      grid-column-gap: 12px;

      & svg {
        margin-right: 4px;
      }

      & button:last-child {
        color: #ff3d3d;
      }
    }
    & .example-area {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 12px;
      & button {
        height: 56px;
        flex-direction: column;
      }
    }
  }

  /* 닫은 경우 상단 표시 스타일 */
  & .close {
    & .title {
      & input {
        pointer-events: none;
        border: none;
        background: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export default ProblemEditAccordion;
