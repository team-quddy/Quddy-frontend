export const enum Sort {
  latest = "latest",
  popular = "popular",
}
export const enum SearchTarget {
  title = "title",
  author = "author",
  both = "both",
}

export type SortOption = Sort.latest | Sort.popular;
export type TargetOption = SearchTarget.title | SearchTarget.author | SearchTarget.both;

export interface SearchOption {
  text: string; // 검색어
  target: TargetOption; // 검색어 적용 타겟
  sort: SortOption; // 정렬옵션

  // TODO: page -> lastIdx 변경
  page: number; // 페이지 번호
  size: number; // 페이지 사이즈
}
