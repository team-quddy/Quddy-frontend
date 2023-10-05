type PK = string;

/** 시험지 타입 */
interface ExamInterface {
  title: string; // 제목
  date: string; // 출제날짜
  scrap: number; // 스크랩 수
  cnt: number; // 문제 개수
  thumbnail: string; // 썸네일
  ref: PK; // 참조 문제집
  id: PK; // 문제집 PK
}

export interface ExamType extends ExamInterface {
  isPublic: boolean; // 공개여부
}

export interface ExamTemplateType extends ExamInterface {
  owner: string; // 사용자 닉네임
}

export interface ExamDetailType<T> extends ExamType {
  problems: T[];
}

export interface ExamDetailStatType<T> extends Omit<ExamDetailType<T>, "id"> {
  total: number;
}

export interface ExamTemplateDetailType<T> extends Omit<ExamTemplateType, "id"> {
  problems: T[];
}

export type ExamEditType<T> = Omit<ExamDetailType<T>, "scrap">;

/** 메인화면 배너 정보 */
export interface BannerType {
  id: PK;
  thumbnail: string; // 썸네일
  alt: string; // 설명
}

/** 문제 타입 */
export interface ProblemType {
  question: string; // 문항
  isObjective: boolean; // 문제 유형
  opt: null | string[]; //  선택지
  exImg: string; // 보기 이미지
  exText: string; // 보기 텍스트
  answer: string; // 정답
}

export interface ProblemStatType extends ProblemType {
  correct: number; // 정답자 수
}

export interface ProblemKeyType extends ProblemType {
  key: number;
}

export interface UserInfoType {
  nickname: string;
  id: PK;
  examCnt: number;
  publicExamCnt: number;
  scrapCnt: number;
}
