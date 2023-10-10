import styled from "styled-components";
import { SolverResultType } from "../../types/types";

interface Props {
  data: SolverResultType;
}

const SolverResult = ({ data }: Props) => {
  return (
    <SolverResultComponent>
      <h1>채점 결과</h1>
      <section className="result" id="result"></section>
      <div>
        <p>닉네임님만의 문제집도 출제해볼까요?</p>
        <button type="button" className="nav-edit-btn">
          출제하러 가기
        </button>
      </div>
    </SolverResultComponent>
  );
};

const SolverResultComponent = styled.main``;

export default SolverResult;
