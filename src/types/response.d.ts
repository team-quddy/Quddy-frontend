import { PK } from "./types";

export interface ResponseListType<T> {
  list: T[];
  page: number;
}
