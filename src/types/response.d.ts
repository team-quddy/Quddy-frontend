import { ProblemStatType, ProblemType, SolverExamType, SolverProblemType, SolverResultType } from "./types";

export interface ResponseListType<T> {
  list: T[];
  page: number;
}

export interface ResponseProblemType extends ProblemType {
  opt: string | null;
}

export interface ResponseProblemStatType extends ProblemStatType {
  opt: string | null;
}

export interface ResponseSolverExamType {
  exam: null | SolverExamType<SolverProblemType>;
  result: null | SolverResultType;
}
