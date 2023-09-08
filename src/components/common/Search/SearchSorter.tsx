import { styled } from "styled-components";
import { Sort, SortOption } from "../../../types/search";

interface Props {
  option: SortOption;
  setOption: (sort: SortOption) => void;
}

const SearchSorter = ({ option, setOption }: Props) => {
  return (
    <SearchSorterComponent>
      <button type="button" className={option == Sort.popular ? "active" : ""} onClick={() => setOption(Sort.popular)}>
        인기순
      </button>
      <button type="button" className={option == Sort.latest ? "active" : ""} onClick={() => setOption(Sort.latest)}>
        최신순
      </button>
    </SearchSorterComponent>
  );
};

const SearchSorterComponent = styled.div``;

export default SearchSorter;
