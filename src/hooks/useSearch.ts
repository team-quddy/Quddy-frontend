import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SearchOption, SearchTarget, Sort } from "../types/search";

const useSearch = <T>(
  func: (search: SearchOption) => Promise<T>
): [SearchOption, React.Dispatch<React.SetStateAction<SearchOption>>, UseQueryResult<T, unknown>] => {
  const [option, setOption] = useState<SearchOption>({
    keyword: "",
    target: SearchTarget.title,
    sort: Sort.popular,
    lastId: null,
    size: 15,
  });
  const query = useQuery(["searchData", option], () => func(option));

  useEffect(() => {
    return () => {
      query.remove();
    };
  }, []);

  return [option, setOption, query];
};

export default useSearch;
