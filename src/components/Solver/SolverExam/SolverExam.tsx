import styled from "styled-components";
import { SolverExamType, SolverProblemType, SolverResultType } from "../../../types/types";

interface Props {
  data: SolverExamType<SolverProblemType>;
  setData(result: SolverResultType): void;
}

const SolverExam = ({ data, setData }: Props) => {
  return <SolverExamComponent>test1</SolverExamComponent>;
};

const SolverExamComponent = styled.main``;

export default SolverExam;
