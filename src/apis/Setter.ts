// 출제자용 요청 모음

import getInstance from ".";
import { ResponseListType } from "../types/response";
import { SearchOption } from "../types/search";
import { ExamEditType, ExamTemplateType, ExamType, ProblemType } from "../types/types";

// sample data
import SampleExamList from "./sample/Exam.json";

/**
 * [GET] 문제집 템플릿 목록 요청
 * @param option 검색 옵션
 */
export async function getExamTemplateList(searchOption: SearchOption): Promise<ResponseListType<ExamTemplateType>> {
  // TODO : 임시 이벤트이므로 추후 api 명세에 따라 수정 필요
  await new Promise((res) => setTimeout(res, 500));
  return {
    list: SampleExamList.map((item) => ({ ...item, id: `${item.id}${searchOption.page}` })),
    page: searchOption.page,
  };
  return await getInstance().get("/template", { params: searchOption });
}

/**
 * [GET] 나의 문제집 목록 요청
 * @param option 검색 옵션
 */
export async function getExamList(searchOption: SearchOption): Promise<ResponseListType<ExamType>> {
  // TODO : 임시 이벤트이므로 추후 api 명세에 따라 수정 필요
  await new Promise((res) => setTimeout(res, 500));
  return {
    list: SampleExamList.map((item) => ({ ...item, id: `${item.id}${searchOption.page}` })),
    page: searchOption.page,
  };
  return await getInstance().get("/setter", { params: searchOption });
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
