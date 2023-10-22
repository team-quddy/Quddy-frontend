import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { SolverExamType, SolverProblemAnsType, SolverProblemType } from "../types/types";
import { useEffect, useState } from "react";
import SolverExamCoverPage from "../components/Solver/SolverExam/SolverExamCoverPage";
import SolverExamProblemPage from "../components/Solver/SolverExam/SolverExamProblemPage";
import LoadingPage from "../components/common/Loading/LoadingPage";
import { useMutation } from "@tanstack/react-query";
import { postSolverExam } from "../apis/Solver";

const SolverExam = () => {
  const id = useParams().id as string;
  const exam = useLoaderData() as SolverExamType<SolverProblemType>;
  const length = exam.problems.length;
  const [page, setPage] = useState<number>(1);
  const [answer, setAnswer] = useState<SolverProblemAnsType[]>([]);
  const navigate = useNavigate();
  const mutation = useMutation(() => postSolverExam(id, answer), {
    onSuccess: (data) => {
      const resultid = data.id;
      navigate(`/solver/result/${resultid}`, { replace: true });
    },
  });

  // 초기 answer값 초기화
  useEffect(() => {
    const answer = exam.problems.map((item) => ({ id: item.id, answer: "" }));
    setAnswer(answer);
  }, [exam.problems]);

  useEffect(() => {
    if (page === length + 1) mutation.mutate();
  }, [page]);

  const onMoveNextProblem = (idx: number, ans: string) => {
    setAnswer((pre) => {
      pre[idx].answer = ans;
      return [...pre];
    });
    setPage((pre) => pre + 1);
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
        <SolverExamCoverPage title={exam.title} onStartExam={() => setPage(1)} />
      ) : answer.length && page <= length ? (
        <SolverExamProblemPage
          exam={exam}
          idx={page - 1}
          preAns={answer[page - 1].answer}
          onMoveNextProblem={onMoveNextProblem}
          onMovePreProblem={onMovePreProblem}
        />
      ) : (
        <LoadingPage />
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
    margin: 16px;
    color: var(--color-primary);
    & > span {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

export default SolverExam;
