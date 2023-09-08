import { TbSearch, TbX } from "react-icons/tb";
import { styled } from "styled-components";

interface Props {
  placeholder?: string;
  search: string;
  setSearch: (str: string) => void;
}

const SearchInput = ({ placeholder, search, setSearch }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <SearchInputComponent>
      <TbSearch />

      <input value={search} onChange={onChange} placeholder={placeholder} />

      {/* 닫기 버튼 */}
      <div>
        <TbX />
      </div>
    </SearchInputComponent>
  );
};

const SearchInputComponent = styled.div``;

export default SearchInput;
