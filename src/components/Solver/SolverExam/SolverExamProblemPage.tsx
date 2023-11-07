import { styled } from "styled-components";
import BackgroundImg from "../../../assets/imgs/paper_background.png";
import { SolverExamType, SolverProblemType } from "../../../types/types";
import SolverExamHeader from "./SolverExamHeader";
import { useEffect, useState } from "react";
import RoundButton from "../../common/Button/RoundButton";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

interface Props {
  exam: SolverExamType<SolverProblemType>;
  preAns: string;
  idx: number;
  onMoveNextProblem(idx: number, ans: string): void;
  onMovePreProblem(idx: number, ans: string): void;
}

const SolverExamProblemPage = ({ exam, preAns, idx, onMoveNextProblem, onMovePreProblem }: Props) => {
  const [ans, setAns] = useState<string>(preAns);
  const problem = exam.problems[idx];

  useEffect(() => {
    setAns(preAns);
  }, [idx, preAns]);

  const onClickNextBtn = () => {
    onMoveNextProblem(idx, ans);
  };

  const onClickPreBtn = () => {
    onMovePreProblem(idx, ans);
  };

  const onChangeAns = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAns(value);
  };

  return (
    <ExamPageComponent>
      <div className="content">
        <SolverExamHeader title={exam.title} />

        <h2 className="question">{problem.question}</h2>

        <div className="example">
          {problem.exImg && (
            <div className="img">
              <img src={problem.exImg} alt="보기 이미지" />
            </div>
          )}
          {problem.exText && <div className="text">{problem.exText}</div>}
        </div>

        {problem.isObjective ? (
          <ol className="objective" data-ans={ans}>
            {problem.opt?.map((item, idx) => (
              <li
                key={`${problem.id}-opt-${idx}`}
                className={String(idx) === ans ? "answer" : ""}
                onClick={() => setAns(`${idx}`)}>
                <div className="opt-no">{idx + 1}</div>
                {item}
              </li>
            ))}
          </ol>
        ) : (
          <input className="subjective" value={ans} onChange={onChangeAns} />
        )}
      </div>

      <div className="page">
        {idx === 0 || (
          <button type="button" onClick={onClickPreBtn} className="pre-btn">
            <TbArrowLeft />
          </button>
        )}
        <RoundButton type="button" onClick={onClickNextBtn} className="next-btn" disabled={!ans}>
          {idx === exam.problems.length - 1 ? (
            <>제출하기</>
          ) : (
            <>
              다음 문제 <TbArrowRight />
            </>
          )}
        </RoundButton>
      </div>
    </ExamPageComponent>
  );
};

const ExamPageComponent = styled.div`
  width: auto;
  min-height: 520px;
  padding: 16px;
  background-image: url(${BackgroundImg});
  background-position: center;
  background-size: 100%;
  background-color: var(--color-theme);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > .content {
    & > .question {
      margin: 24px 0 24px 24px;
      line-height: 24px;
      &::before {
        content: "Q.";
        color: var(--color-primary);
        font-weight: bold;
        position: absolute;
        margin-left: -24px;
      }
    }

    & > .example {
      margin-bottom: 16px;
      & > .text {
        border: 1px solid var(--color-text);
        line-height: 20px;
        padding: 16px;
      }
      & > .img {
        display: flex;
        background-color: var(--color-gray);
        min-height: 200px;
        max-height: 320px;
        width: 100%;
        height: 100%;
        & > img {
          max-width: 100%;
          max-height: 100%;
          margin: auto;
        }
      }
    }

    & > .objective {
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
      &::before {
        content: "";
        transition: all 200ms ease;
        position: absolute;
        width: 100%;
        height: 25%;
        border-radius: 4px;
        background-color: var(--color-primary);
        opacity: 0.125;
        pointer-events: none;
      }
      &[data-ans=""]::before {
        opacity: 0;
      }
      &[data-ans!=""]::before {
        opacity: 1;
      }
      &[data-ans="0"]::before {
        top: 0%;
      }
      &[data-ans="1"]::before {
        top: 25%;
      }
      &[data-ans="2"]::before {
        top: 50%;
      }
      &[data-ans="3"]::before {
        top: 75%;
      }

      & li {
        font-size: 16px;
        padding: 12px;
        display: flex;
        align-items: center;

        & .opt-no {
          font-size: 12px;
          margin-right: 8px;
          border: 1px solid var(--color-text);
          border-radius: 50%;
          width: 16px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.answer {
          font-weight: bold;
          color: var(--color-primary);

          & .opt-no {
            background-color: var(--color-primary);
            color: var(--color-theme);
            font-weight: bold;
            border: none;
          }
        }
      }
    }

    & > input.subjective {
      width: calc(100% - 32px);
      margin: 8px 16px;
      height: 40px;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--color-primary);
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  & > .page {
    display: flex;
    padding: 16px;
    justify-content: space-between;

    & > .next-btn {
      margin: auto;
      font-size: 20px;
      line-height: 48px;
      height: 52px;
      display: flex;
      align-items: center;

      & svg {
        margin-right: -8px;
        font-size: 28px;
      }
    }

    & > .pre-btn {
      height: 52px;
      aspect-ratio: 1;
      background-color: var(--color-background);
      border: 0;
      border-radius: 50%;
      color: var(--color-primary);
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default SolverExamProblemPage;
