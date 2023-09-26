import { styled } from "styled-components";
import Accordion from "../../../common/Accordion/Accordion";
import { ProblemType } from "../../../../types/types";

interface Props {
  no: number;
  problem: ProblemType;
}

const ProblemViewAccordion = ({ no, problem }: Props) => {
  return (
    <ProblemViewComponent>
      <Accordion id={`problem-${no}`}>
        <div className="title">
          <div className="problem-no">Q {no}</div>
          <p className="question">{problem.question}</p>
        </div>

        <div className="content">
          {/* 문제 기본 정보 */}
          <div className="problem-info">{problem.isObjective ? "객관식" : "주관식"}</div>

          {/* 보기 */}
          {problem.exImg ? (
            <div className="example-img">
              <img src={problem.exImg} alt={`${no}번째 문제 보기 이미지`} />
            </div>
          ) : undefined}
          {problem.exText ? <div className="example-text">{problem.exText}</div> : undefined}

          {/* 정답 + 선택지 */}
          {problem.isObjective ? (
            <ol className="objective">
              {problem.opt?.map((item, idx) => (
                <li key={`problem-${no}-opt-${idx}`} className={idx === Number(problem.answer) ? "answer" : ""}>
                  <div className="opt-no">{idx + 1}</div>
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <div className="subjective">
              <div>정답</div>
              <div className="answer">{problem.answer}</div>
            </div>
          )}
        </div>
      </Accordion>
    </ProblemViewComponent>
  );
};

const ProblemViewComponent = styled.div`
  & > div {
    transition: height 1000ms;
  }
  /* 상단부 스타일 */
  & .title {
    display: flex;
    margin: 8px 0;
    align-items: center;

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
    & .question {
      display: block;
      width: 100%;
      margin-left: 4px;
      border: none;
      border-radius: 4px;
      padding: 0 8px;
      font-size: 14px;
      line-height: 20px;
      color: var(--color-text);
    }
  }
  /* 하단부 스타일 */
  & .content {
    padding: 16px;

    & > .problem-info {
      text-align: right;
      font-size: 12px;
      color: var(--color-primary);
    }

    & > * {
      margin-bottom: 12px;
    }

    & .example-img {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 32px;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1.5;
      display: flex;
      align-items: center;
      justify-content: center;

      & > img {
        max-width: 100%;
        max-height: 100%;
      }

      & + .example-text {
        margin-top: -24px;
      }
    }

    & .example-text {
      margin-bottom: 32px;
      background-color: var(--color-light-gray);
      border-radius: 8px;
      padding: 40px 16px 16px;
      font-size: 14px;
      position: relative;

      &::after {
        content: "보기 텍스트";
        font-size: 12px;
        position: absolute;
        top: 16px;
        left: 16px;
        color: var(--color-primary);
        font-weight: bold;
      }
    }

    /* 객관식 */
    & .objective {
      margin-top: -12px;

      & li {
        font-size: 14px;
        margin: 12px 0;
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
    /* 주관식 */
    & .subjective {
      margin-top: -12px;
      & div {
        line-height: 16px;
        font-size: 12px;
      }
      & .answer {
        margin-top: 4px;
        border-radius: 8px;
        padding: 8px;
        background-color: var(--color-background);
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: var(--color-primary);
      }
    }
  }

  /* 닫은 경우 상단 표시 스타일 */
  & .close {
    & .title {
      & .question {
        pointer-events: none;
        border: none;
        background: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export default ProblemViewAccordion;
