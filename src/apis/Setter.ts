// 출제자용 요청 모음

import getInstance from ".";
import { SearchOption } from "../types/search";
import { ExamTemplateType } from "../types/types";

/**
 * [GET] 문제집 템플릿 목록 요청
 * @param option 검색 옵션
 */
export function getExamTemplateList(searchOption: SearchOption): Promise<ExamTemplateType[]> {
  return getInstance().get("/template", { params: searchOption });
}
