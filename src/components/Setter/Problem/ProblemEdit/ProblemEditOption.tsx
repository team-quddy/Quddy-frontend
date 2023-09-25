import { styled } from "styled-components";
import { ProblemKeyType } from "../../../../types/types";
import { ChangeEvent, useRef } from "react";
import Checkbox from "../../../common/Checkbox/Checkbox";
import { StretchHeightEvent } from "../../../../types/event";

interface Props {
  problem: ProblemKeyType;
  setProblem: (problem: ProblemKeyType) => void;
}

const ProblemEditOption = ({ problem, setProblem }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  // 정답 방식 변경 이벤트
  const onChangeObjective = (isObjective: boolean) => {
    const opt = ["", "", "", ""];
    const answer = isObjective ? "" : "0";
    isObjective = !isObjective;
    setProblem({ ...problem, isObjective, opt, answer });

    const height = isObjective ? 126 : -126;

    // 컴포넌트 크기 변경에 따른 이벤트 실행
    divRef.current?.dispatchEvent(
      new CustomEvent<StretchHeightEvent>("stretchHeight", {
        detail: {
          height,
        },
        bubbles: true,
      })
    );
  };

  // 정답 변경 이벤트
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setProblem({ ...problem, answer });
  };

  // 지문 변경 이벤트
  const onChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const no = Number(e.currentTarget.dataset.no);
    const opt = problem.opt || ["", "", "", ""];
    opt[no] = value;
    setProblem({ ...problem, opt });
  };

  return (
    <ProblemEditOptionComponent ref={divRef}>
      <Checkbox
        id={`${problem.key}-isObjecive`}
        label="주관식"
        value={!problem.isObjective}
        setValue={onChangeObjective}
      />
      {problem.isObjective ? (
        <>
          <div className="ans-column">정답</div>
          <div className="objective">
            {problem.opt?.map((item, idx) => (
              <div key={`${problem.key}-opt-${idx}`}>
                <div className="opt-no">{idx + 1}</div>
                <input
                  type="text"
                  onChange={onChangeOption}
                  data-no={idx}
                  value={item || ""}
                  placeholder="보기를 입력해주세요"
                />
                <input
                  type="radio"
                  onChange={onChangeAnswer}
                  id={`answer-${idx}`}
                  name="answer"
                  defaultChecked={idx == Number(problem.answer)}
                  value={idx}
                />
                <label htmlFor={`answer-${idx}`} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="subjective">
          <label>정답</label>
          <input
            type="text"
            id={`answer-${problem.key}`}
            value={problem.answer}
            onChange={onChangeAnswer}
            placeholder="정답을 입력해주세요"
          />
        </div>
      )}
    </ProblemEditOptionComponent>
  );
};

const ProblemEditOptionComponent = styled.div`
  margin-top: 16px;
  margin-bottom: 0 !important;
  position: relative;

  & > div:first-child {
    top: -31px;
    left: calc(1em * 5);
    position: absolute;
  }

  & .ans-column {
    top: -28px;
    right: 0;
    width: 40px;
    font-size: 12px;
    position: absolute;
    text-align: center;
  }

  & input[type="text"] {
    height: 30px;
    border: none;
    border-radius: 4px;
    padding: 0 8px;
    background-color: var(--color-light-gray);
    font-size: 12px;
    color: var(--color-text);
    flex: 1 1 0;

    &:focus,
    &:active {
      outline-color: var(--color-background);
    }
    &::placeholder {
      color: var(--color-primary);
      opacity: 0.5;
    }
  }

  // 객관식 스타일
  & .objective {
    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    & .opt-no {
      width: 16px;
      height: 16px;
      border: 1px solid var(--color-primary);
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      line-height: 14px;
      color: var(--color-primary);
      margin-right: 8px;
    }
    & input[type="radio"] {
      visibility: hidden;
      position: absolute;

      & + label {
        display: block;
        margin: auto 12px;
        width: 16px;
        height: 16px;
        border: 2px solid var(--color-gray);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &::after {
          content: "";
          position: absolute;
          background-color: var(--color-primary);
          border-radius: 50%;
          width: 10px;
          height: 10px;
          transform: scale(0);
          transition: all 250ms;
        }
      }

      &:checked + label {
        &::after {
          transform: scale(1);
        }
      }
    }
  }

  // 단답식 스타일
  & .subjective {
    display: flex;
    align-items: center;
    & label {
      font-size: 12px;
      margin-right: 12px;
    }
  }
`;

export default ProblemEditOption;
