import getInstance from ".";
import { ResponseSolverExamResultType, ResponseSolverExamType, ResponseSolverProblemType } from "../types/response";
import { PK, SolverExamResultType, SolverProblemAnsType, SolverProblemType } from "../types/types";

/**
 * [GET] 응시자 시험 정보 요청
 * @param id 응시하는 시험 id
 * @returns
 */
export async function getSolverExamById(id: PK): Promise<ResponseSolverExamType> {
  const { data } = await getInstance().get(`/solver/exam/${id}`);
  // id가 존재하는 경우 그대로 반환
  if (data.id) return data;

  const problems: SolverProblemType[] = data.exam.problems.map((item: ResponseSolverProblemType) => {
    if (item.objective !== undefined) item.isObjective = item.objective;
    return { ...item, opt: item.opt ? JSON.parse(item.opt) : null };
  });

  data.exam.problems = problems;

  // const problems = SampleProblemList.map((item, idx) => ({ ...item, id: `${id}-${idx}` }));
  // const data: ResponseSolverExamType = {
  //   id: null,
  //   exam: {
  //     title: "테스트문제집",
  //     problems,
  //   },
  // };
  // if (id === "1") data.id = "1";
  return data;
}

/**
 * [GET] 응시자 시험결과 정보 요청
 * @param id 시험결과 id
 * @returns
 */
export async function getSolverExamResultById(id: PK): Promise<ResponseSolverExamResultType> {
  const { data } = await getInstance().get(`/solver/result/${id}`);

  // const problems = SampleProblemList.map((item, idx) => ({ ...item, resultAnswer: "2", id: `${id}-${idx}` }));
  // const data: ResponseSolverExamResultType = {
  //   result: { problemCnt: 5, correct: 4, percentile: 0.75, firstSolver: false },
  //   exam: {
  //     title: "테스트문제집",
  //     problems,
  //   },
  // };
  return data;
}

/**
 * [POST] 응시자 시험 채점 요청
 * @param id 응시하는 시험 id
 * @param problems 응답한 문제 배열
 * @returns
 */
export async function postSolverExam(id: PK, problems: SolverProblemAnsType[]): Promise<SolverExamResultType> {
  const { data } = await getInstance().post(`/solver/exam`, { id, problems });
  return data;
}
