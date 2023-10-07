import { ProblemStatType, ProblemType } from "./types";

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
