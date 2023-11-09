// 출제자용 요청 모음

import { AxiosResponse } from "axios";
import getInstance from ".";
import { ResponseListType, ResponseProblemStatType, ResponseProblemType } from "../types/response";
import { SearchOption } from "../types/search";
import {
  ExamDetailStatType,
  ExamEditType,
  ExamTemplateDetailType,
  ExamTemplateType,
  ExamType,
  PK,
  ProblemKeyType,
  ProblemStatType,
  ProblemType,
  UserInfoType,
} from "../types/types";

import SampleProblemList from "./sample/Problem.json";

/**
 * [GET] 유저 정보 요청
 * @returns
 */
export async function getUserInfo(): Promise<UserInfoType> {
  const { data } = await getInstance().get("/user");
  return data;
}

/**
 * [POST] 유저 간편 생성 요청
 * @param nickname 닉네임
 * @returns
 */
export async function postCreateUser(nickname: string): Promise<void> {
  return await getInstance().post("", { nickname });
}

/**
 * [GET] 테스트 요청
 */
export async function getTestApi() {
  const res = await getInstance().get("");
  console.dir(res);
}

/**
 * [GET] 랜덤 문제 요청
 */
export async function getRandomProblem() {
  const ranIdx = Math.round(Math.random() * +SampleProblemList.length) - 1;
  return SampleProblemList[ranIdx];
}

/**
 * [GET] 문제집 템플릿 목록 요청
 * @param option 검색 옵션
 */
export async function getExamTemplateList(searchOption: SearchOption): Promise<ResponseListType<ExamTemplateType>> {
  const { data } = await getInstance().get("/template", { params: searchOption });
  return {
    list: data.exams,
    page: searchOption.page,
  };
}

/**
 * [GET] 문제집 템플릿 상세 정보 요청
 * @param id 문제집 아이디
 */
export async function getExamTemplateById(id: PK): Promise<ExamTemplateDetailType<ProblemType>> {
  const { data } = await getInstance().get(`/template/${id}`);
  const problems = data.problems.map((item: ResponseProblemType) => ({
    ...item,
    opt: item.opt ? JSON.parse(item.opt) : null,
  }));
  return { ...data, problems };
}

/**
 * [GET] 나의 문제집 목록 요청
 * @param option 검색 옵션
 */
export async function getExamList(searchOption: SearchOption): Promise<ResponseListType<ExamType>> {
  const { data } = await getInstance().get("/setter/exam", { params: searchOption });
  return {
    list: data.exams,
    page: searchOption.page,
  };
}

/**
 * [GET] 나의 문제집 상세 정보 요청
 * @param id 문제집 아이디
 * @returns
 */
export async function getExamById(id: PK): Promise<ExamDetailStatType<ProblemStatType>> {
  const { data } = await getInstance().get(`/setter/exam/${id}`);
  const problems = data.problems.map((item: ResponseProblemStatType) => ({
    ...item,
    opt: item.opt ? JSON.parse(item.opt) : null,
  }));
  return { ...data, problems };
}

/**
 * [POST] 문제집 등록 요청
 */
export async function postExam(exam: ExamEditType<ProblemType>): Promise<PK> {
  // 불필요한 field 삭제 & opt stringify
  const problems: ResponseProblemType[] = exam.problems.map(
    ({ question, isObjective, answer, opt, exImg, exText }) => ({
      question,
      isObjective,
      answer,
      opt: opt ? JSON.stringify(opt) : null,
      exImg,
      exText,
    })
  );

  const data = { ...exam, problems };
  const res = await getInstance().post<ExamEditType<ProblemType>, AxiosResponse<{ id: PK }>>("/setter/exam", data);
  return res.data.id;
}

/**
 * [PUT] 문제집 변경 요청
 * @param exam
 * @returns
 */
export async function putExam(id: PK, exam: ExamEditType<ProblemType>): Promise<PK> {
  // 불필요한 field 삭제 & opt stringify
  const problems: ResponseProblemType[] = exam.problems.map(
    ({ question, isObjective, answer, opt, exImg, exText }) => ({
      question,
      isObjective,
      answer,
      opt: opt ? JSON.stringify(opt) : null,
      exImg,
      exText,
    })
  );

  const data = { ...exam, problems };
  const res = await getInstance().put<ExamEditType<ProblemType>, AxiosResponse<{ id: PK }>>(`/setter/exam/${id}`, data);
  return res.data.id;
}

/**
 * [GET] 문제집 수정 초기값 요청
 * @param id 아이디
 * @param template 템플릿 여부
 * @returns
 */
export async function getInitialExamData(
  id: PK | null = "",
  template: string | null = ""
): Promise<ExamEditType<ProblemKeyType>> {
  if (!id) {
    return { isPublic: false, title: "", date: "2023/09/10", cnt: 0, thumbnail: "", ref: "", id: "", problems: [] };
  }
  if (!template) {
    const res = await getExamById(id);
    const problems = res.problems.map((item, idx) => ({ ...item, key: idx }));
    const result: ExamEditType<ProblemKeyType> = { ...res, problems, id };
    return result;
  } else {
    const res = await getExamTemplateById(id);
    const problems = res.problems.map((item, idx) => ({ ...item, key: idx }));
    const result: ExamEditType<ProblemKeyType> = { ...res, problems, id, isPublic: true };
    return result;
  }
}
