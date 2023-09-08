import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SearchOption, SearchTarget, Sort } from "../types/search";

const useSearch = <T>(
  func: (search: SearchOption) => Promise<T>
): [SearchOption, React.Dispatch<React.SetStateAction<SearchOption>>, UseQueryResult<T, unknown>] => {
  const [option, setOption] = useState<SearchOption>({
    text: "",
    target: SearchTarget.title,
    sort: Sort.popular,
    page: 0,
    size: 6,
  });

  // TODO : 과도한 재검색을 방지하기위한 이벤트 제어 추가
  const query = useQuery({ queryKey: ["searchData", option], queryFn: () => func(option) });

  return [option, setOption, query];
};

export default useSearch;
