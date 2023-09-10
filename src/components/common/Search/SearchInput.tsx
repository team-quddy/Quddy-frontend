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
      <button type="button" className={`clear-btn ${search ? "" : "blank"}`} onClick={() => setSearch("")}>
        <TbX />
      </button>
    </SearchInputComponent>
  );
};

const SearchInputComponent = styled.div`
  background-color: var(--color-light-gray);
  border-radius: 8px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  &:focus-within {
    outline: 2px solid var(--color-background);

    & > svg {
      transform: scale(1.125);
    }
  }

  & input {
    background: none;
    border: none;
    flex: 1 1 0;
    font-size: 14px;
    &:active,
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--color-primary);
      opacity: 0.5;
    }
  }
  & > svg {
    transition: all 200ms;
    font-size: 20px;
    color: var(--color-primary);
    margin-right: 8px;
  }

  & .clear-btn {
    background-color: var(--color-gray);
    border: none;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    display: flex;
    padding: 0;

    & > svg {
      margin: auto;
      font-size: 14px;
      color: white;
    }

    &.blank {
      display: none;
    }
  }
`;

export default SearchInput;
