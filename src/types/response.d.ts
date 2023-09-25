import { PK } from "./types";

export interface ResponseListType<T> {
  list: T[];
  lastId: null | PK;
}
