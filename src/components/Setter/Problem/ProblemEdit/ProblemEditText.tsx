import { TbTextPlus } from "react-icons/tb";
import { styled } from "styled-components";

const ProblemEditText = () => {
  return (
    <ProblemEditTextComponent>
      <button type="button">
        <TbTextPlus />
        텍스트 추가
      </button>
    </ProblemEditTextComponent>
  );
};

const ProblemEditTextComponent = styled.div`
  background-color: var(--color-background);
`;

export default ProblemEditText;
