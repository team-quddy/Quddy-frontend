import { styled } from "styled-components";
import BackgroundImg from "../../../assets/imgs/paper_background.png";
import { SolverProblemAnsType, SolverProblemType } from "../../../types/types";

interface Props {
  onMoveNextProblem(ans: SolverProblemAnsType): void;
  onMovePreProblem(): void;
  problem: SolverProblemType;
  preAns: SolverProblemAnsType | undefined;
}

const SolverExamProblemPage = ({ problem, preAns, onMoveNextProblem, onMovePreProblem }: Props) => {
  const onClickNextBtn = () => {
    onMoveNextProblem({ id: problem.id, answer: "2" });
  };
  return (
    <ExamPageComponent>
      {preAns && preAns.answer}
      <button type="button" onClick={onMovePreProblem}>
        pre
      </button>
      <button type="button" onClick={onClickNextBtn}>
        next
      </button>
    </ExamPageComponent>
  );
};

const ExamPageComponent = styled.div`
  width: auto;
  padding: 16px;
  background-image: url(${BackgroundImg});
  background-position: center;
  background-size: 100%;
  background-color: var(--color-theme);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default SolverExamProblemPage;
