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
