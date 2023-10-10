import { useState } from "react";
import styled from "styled-components";
import { ResponseSolverExamType } from "../types/response";
import { useLoaderData } from "react-router-dom";
import SolverExam from "../components/Solver/SolverExam";
import SolverResult from "../components/Solver/SolverResult";
import { SolverResultType } from "../types/types";

const Solver = () => {
  const [data, setData] = useState<ResponseSolverExamType>(useLoaderData() as ResponseSolverExamType);
  const onSetResult = (result: SolverResultType) => {
    setData({
      exam: null,
      result,
    });
  };
  return (
    <SovlerComponent>
      {data.exam && <SolverExam data={data.exam} setData={onSetResult} />}
      {data.result && <SolverResult data={data.result} />}
    </SovlerComponent>
  );
};

const SovlerComponent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background);

  & > main {
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
`;

export default Solver;
