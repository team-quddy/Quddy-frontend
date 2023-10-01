// 출제자용 요청 모음

import getInstance from ".";
import { ResponseListType } from "../types/response";
import { SearchOption } from "../types/search";
import {
  ExamDetailStatType,
  ExamEditType,
  ExamTemplateDetailType,
  ExamTemplateType,
  ExamType,
  PK,
  ProblemStatType,
  ProblemType,
} from "../types/types";

// sample data
import SampleExamList from "./sample/Exam.json";
import SampleProblem from "./sample/Problem.json";
import SampleThumbnail from "../assets/imgs/temp_thumbnail.png";

/**
 * [GET] 문제집 템플릿 목록 요청
 * @param option 검색 옵션
 */
export async function getExamTemplateList(searchOption: SearchOption): Promise<ResponseListType<ExamTemplateType>> {
  // TODO: 임시 이벤트이므로 추후 api 명세에 따라 수정 필요
  await new Promise((res) => setTimeout(res, 500));
  const list: ExamTemplateType[] = SampleExamList.map((item) => ({ ...item, id: `${item.id}${searchOption.page}` }));
  return {
    list,
    page: searchOption.page,
  };
  return await getInstance().get("/template", { params: searchOption });
}

/**
 * [GET] 문제집 템플릿 상세 정보 요청
 * @param id 문제집 아이디
 */
export async function getExamTemplateById(id: PK): Promise<ExamTemplateDetailType<ProblemType>> {
  // TODO: 임시 이벤트이므로 추후 api 명세에 따라 수정 필요
  await new Promise((res) => setTimeout(res, 500));
  const thumbnail = SampleThumbnail;

  return {
    title: "테스트 입력입니다",
    date: "2020/09/26",
    scrap: 100,
    cnt: 5,
    thumbnail,
    ref: "",
    owner: "비가츄",
    problems: SampleProblem,
  };

  return await getInstance().get(`/template/${id}`);
}

/**
 * [GET] 나의 문제집 목록 요청
 * @param option 검색 옵션
 */
export async function getExamList(searchOption: SearchOption): Promise<ResponseListType<ExamType>> {
  // TODO: 임시 이벤트이므로 추후 api 명세에 따라 수정 필요
  await new Promise((res) => setTimeout(res, 500));
  const list: ExamType[] = SampleExamList.map((item) => ({ ...item, id: `${item.id}${searchOption.page}` }));
  return {
    list,
    page: searchOption.page,
  };
  return await getInstance().get("/setter", { params: searchOption });
}

/**
 * [GET] 나의 문제집 상세 정보 요청
 * @param id 문제집 아이디
 * @returns
 */
export async function getExamById(id: PK): Promise<ExamDetailStatType<ProblemStatType>> {
  // TODO: 임시 이벤트이므로 추후 api 명세에 따라 수정 필요
  await new Promise((res) => setTimeout(res, 500));
  const thumbnail = SampleThumbnail;
  const problems: ProblemStatType[] = SampleProblem.map((item, idx) => ({ ...item, correct: 10 * (idx + 1) }));

  return {
    title: "테스트 입력입니다",
    date: "2020/09/26",
    scrap: 100,
    cnt: 5,
    thumbnail,
    ref: "",
    total: 50,
    isPublic: false,
    problems,
  };

  return await getInstance().get(`/template/${id}`);
}

/**
 * [POST] 문제집 등록 요청
 */
export async function postExam(exam: ExamEditType<ProblemType>): Promise<void> {
  // 불필요한 field 삭제
  const problems = exam.problems.map(({ question, isObjective, answer, opt, exImg, exText }) => ({
    question,
    isObjective,
    answer,
    opt,
    exImg,
    exText,
  }));

  exam.problems = problems;
  return await getInstance().post<ExamEditType<ProblemType>, void>("/setter", exam);
}
