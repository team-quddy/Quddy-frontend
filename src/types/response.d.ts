import {
  ProblemStatType,
  ProblemType,
  SolverExamType,
  SolverProblemResultType,
  SolverProblemType,
  SolverResultType,
} from "./types";

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
  id: PK | null;
  exam: SolverExamType<SolverProblemType>;
}

export interface ResponseSolverExamResultType {
  exam: SolverExamType<SolverProblemResultType>;
  result: SolverResultType;
}
