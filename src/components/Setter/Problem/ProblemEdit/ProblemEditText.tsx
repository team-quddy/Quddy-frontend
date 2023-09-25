import { ChangeEvent, useRef, useState } from "react";
import { TbTextPlus, TbX } from "react-icons/tb";
import { styled } from "styled-components";
import { StretchHeightEvent } from "../../../../types/event";
import { ProblemKeyType } from "../../../../types/types";

interface Props {
  problem: ProblemKeyType;
  setProblem: (problem: ProblemKeyType) => void;
}

const ProblemEditText = ({ problem, setProblem }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [edit, setEdit] = useState<boolean>(false);

  // 보기 텍스트 활성화 이벤트
  const onActiveEdit = () => {
    // 컴포넌트 크기 변경에 따른 이벤트 실행
    divRef.current?.dispatchEvent(
      new CustomEvent<StretchHeightEvent>("stretchHeight", {
        detail: {
          height: divRef.current.offsetWidth * (2 / 3) - 56,
        },
        bubbles: true,
      })
    );
    setEdit(true);
  };

  // 보기 텍스트 비활성화 이벤트
  const onInactiveEdit = () => {
    // 컴포넌트 크기 변경에 따른 이벤트 실행
    divRef.current?.dispatchEvent(
      new CustomEvent<StretchHeightEvent>("stretchHeight", {
        detail: {
          height: -(divRef.current.offsetWidth * (2 / 3) - 56),
        },
        bubbles: true,
      })
    );
    setProblem({ ...problem, exText: "" });
    setEdit(false);
  };

  // 텍스트 변경 이벤트
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setProblem({ ...problem, exText: value });
  };

  return (
    <ProblemEditTextComponent ref={divRef}>
      {edit ? (
        <>
          <div className="textarea-header">
            <h4>보기 텍스트</h4>
            <button type="button" onClick={onInactiveEdit}>
              <TbX />
            </button>
          </div>
          <textarea placeholder="보기 텍스트를 입력해주세요" value={problem.exText} onChange={onChangeText} />
        </>
      ) : (
        <button type="button" onClick={onActiveEdit}>
          <TbTextPlus />
          텍스트 추가
        </button>
      )}
    </ProblemEditTextComponent>
  );
};

const ProblemEditTextComponent = styled.div`
  position: relative;
  & > button {
    border: none;
    border-radius: 8px;
    padding: 4px 0 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 56px;
    background-color: var(--color-light-gray);
    color: var(--color-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    & svg {
      font-size: 26px;
    }
  }
  & .textarea-header {
    font-size: 12px;
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 8px 8px 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-primary);
    font-weight: bold;
    & button {
      background-color: var(--color-gray);
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      font-size: 28px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & > textarea {
    position: relative;
    width: 100%;
    aspect-ratio: 1.5;
    border: none;
    border-radius: 8px;
    background-color: var(--color-light-gray);
    padding: 40px 16px 16px;
    resize: none;
    font-family: inherit;
    font-size: 12px;

    &::placeholder {
      color: var(--color-background);
    }

    &:focus,
    &:active {
      outline-color: var(--color-background);
    }
  }
`;

export default ProblemEditText;
