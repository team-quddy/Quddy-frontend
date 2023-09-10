// 출제자용 요청 모음

import getInstance from ".";
import { ResponseListType } from "../types/response";
import { SearchOption } from "../types/search";
import { ExamTemplateType, ExamType } from "../types/types";

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
  return await getInstance().get("/template", { params: searchOption });
}
