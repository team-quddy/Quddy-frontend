import { styled } from "styled-components";
import Accordion from "../../../common/Accordion/Accordion";
import { TbArrowsShuffle } from "react-icons/tb";
import { ProblemKeyType } from "../../../../types/types";
import ProblemEditText from "./ProblemEditText";
import ProblemEditImage from "./ProblemEditImage";
import ProblemEditOption from "./ProblemEditOption";

interface Props {
  no: number;
  problem: ProblemKeyType;
  setProblem: (problem: ProblemKeyType) => void;
  removeProblem: (key: number) => void;
}

const ProblemEditAccordion = ({ no, problem, setProblem, removeProblem }: Props) => {
  // 문제 변경 이벤트
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const question = e.target.value;
    setProblem({ ...problem, question });
  };

  // 문제 삭제 이벤트
  const onRemoveProblem = () => {
    removeProblem(problem.key);
  };

  return (
    <ProblemEditComponent>
      <Accordion>
        <div className="title">
          <div className="problem-no">Q {no}</div>
          <input
            onClick={(e) => e.stopPropagation()}
            value={problem.question}
            onChange={onChangeQuestion}
            placeholder="질문을 작성해주세요"
          />
        </div>

        <div className="content">
          <h3>문제 설정</h3>
          <div className="management-area">
            <button type="button">
              <TbArrowsShuffle /> 랜덤 문제 가져오기
            </button>
            <button type="button" onClick={onRemoveProblem}>
              문제 삭제
            </button>
          </div>

          <h3>보기 설정</h3>
          <div className="example-area">
            <ProblemEditImage problem={problem} setProblem={setProblem} />
            <ProblemEditText problem={problem} setProblem={setProblem} />
          </div>

          <h3>선택지 설정</h3>
          <ProblemEditOption problem={problem} setProblem={setProblem} />
        </div>
      </Accordion>
    </ProblemEditComponent>
  );
};

const ProblemEditComponent = styled.div`
  & > div {
    transition: height 1000ms;
  }
  /* 상단부 스타일 */
  & .title {
    display: flex;
    margin: 8px 0;

    & .problem-no {
      min-width: 48px;
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
      display: grid;
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
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 12px;
      & > button {
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        height: auto;
        & svg {
          font-size: 24px;
        }
      }
    }

    & .option-area {
      display: flex;
      & > div {
        margin-left: 16px;
        margin-bottom: 8px;
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
