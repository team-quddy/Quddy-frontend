import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { SolverExamType, SolverProblemAnsType, SolverProblemType } from "../types/types";
import { useEffect, useState } from "react";
import SolverExamCoverPage from "../components/Solver/SolverExam/SolverExamCoverPage";
import SolverExamProblemPage from "../components/Solver/SolverExam/SolverExamProblemPage";
import LoadingPage from "../components/common/Loading/LoadingPage";

const SolverExam = () => {
  const exam = useLoaderData() as SolverExamType<SolverProblemType>;
  const length = exam.problems.length;
  const [page, setPage] = useState<number>(-1);
  const [answer, setAnswer] = useState<SolverProblemAnsType[]>([]);

  useEffect(() => {
    return () => {
      setPage((pre) => pre + 1);
    };
  }, [answer]);

  const onMoveNextProblem = (ans?: SolverProblemAnsType) => {
    if (!ans) setPage(1);
    else if (answer.length < page) setAnswer((pre) => [...pre, ans]);
    else
      setAnswer((pre) => {
        pre[page - 1] = ans;
        return [...pre];
      });
  };

  const onMovePreProblem = () => {
    setPage((pre) => pre - 1);
  };

  return (
    <SolverExamComponent>
      {page === 0 || page > length ? (
        <h1>우정고사 시험장</h1>
      ) : (
        <h1>
          {page}문제 <span>/ {length}문제</span>
        </h1>
      )}

      {page === 0 ? (
        <SolverExamCoverPage title={exam.title} onMoveNextProblem={onMoveNextProblem} />
      ) : page > length ? (
        <LoadingPage />
      ) : (
        <SolverExamProblemPage
          problem={exam.problems[page - 1]}
          onMoveNextProblem={onMoveNextProblem}
          onMovePreProblem={onMovePreProblem}
          preAns={answer[page - 1]}
        />
      )}
    </SolverExamComponent>
  );
};

const SolverExamComponent = styled.main`
  padding: 72px 16px;

  & > button.start-btn {
    margin: 32px auto;
    padding: 0 56px;
  }

  & > h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 16px 0;
    color: var(--color-primary);
    & > span {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

export default SolverExam;
