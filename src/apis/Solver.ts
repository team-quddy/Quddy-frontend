import getInstance from ".";
import { ResponseSolverExamType } from "../types/response";
import { PK, SolverProblemAnsType, SolverResultType } from "../types/types";

// Sample Data
import SampleProblemList from "./sample/Problem.json";

/**
 * [GET] 응시자 시험 정보 요청
 * @param id 응시하는 시험 id
 * @returns
 */
export async function getSolverExamById(id: PK): Promise<ResponseSolverExamType> {
  // const { data } = await getInstance().get(`/solver/exam/${id}`);
  const data: ResponseSolverExamType = { result: null, exam: null };
  if (id === "1") data.result = { problemCnt: 5, correct: 4, percentile: 0.75, firstSolver: false };
  else if (id === "2")
    data.exam = {
      title: "테스트문제집",
      problems: SampleProblemList,
    };
  return data;
}

/**
 * [POST] 응시자 시험 채점 요청
 * @param id 응시하는 시험 id
 * @param problems 응답한 문제 배열
 * @returns
 */
export async function postSolverExam(id: PK, problems: SolverProblemAnsType[]): Promise<SolverResultType> {
  const { data } = await getInstance().post(`/solver/exam/${id}`, { problems });
  return data;
}
