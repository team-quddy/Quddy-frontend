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

const SearchSorterComponent = styled.div`
  & button {
    margin-left: 8px;
    background: none;
    border: 2px solid var(--color-primary);
    border-radius: 16px;
    padding: 3px 12px 2px;

    font-weight: bold;
    font-size: 14px;
    color: var(--color-primary);

    &.active {
      background-color: var(--color-primary);
      color: var(--color-theme);
    }
  }
`;

export default SearchSorter;
