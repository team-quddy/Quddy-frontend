type PK = string;

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
  nickname: string; // 사용자 닉네임
}

/** 메인화면 배너 정보 */
export interface BannerType {
  id: PK;
  thumbnail: string; // 썸네일
  alt: string; // 설명
}

export interface ExamDetailType<T> {
  isPublic: boolean; // 공개여부
  title: string; // 제목
  date: string; // 출제날짜
  scrap: number; // 스크랩 수
  cnt: number; // 문제 개수
  thumbnail: string; // 썸네일
  ref: PK; // 참조 문제집
  problems: T[];
}

export interface ExamEditType<T> extends ExamDetailType<T> {
  id: PK;
}

export interface ProblemType {
  question: string; // 문항
  is_objective: boolean; // 문제 유형
  opt: null | string[]; //  선택지
  ex_img: string; // 보기 이미지
  ex_text: string; // 보기 텍스트
  answer: string; // 정답
}

export interface ProblemStatisticalType extends ProblemType {
  correct: number; // 정답자 수
}

export interface ProblemKeyType extends ProblemType {
  key: number;
}
