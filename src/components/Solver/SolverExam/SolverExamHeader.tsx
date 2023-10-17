import styled from "styled-components";

interface Props {
  title: string;
}

const SolverExamHeader = ({ title }: Props) => {
  return (
    <SolverExamHeaderComponent>
      <hr />
      <div className="title">
        <p>2023년도 10월 큐디고사</p>
        <h2>{title}</h2>
      </div>

      <div className="decoration">
        <div>제 1교시</div>

        <div>
          <div>성명</div>
          <div className="nickname">홍길동</div>
        </div>
      </div>
      <hr />
    </SolverExamHeaderComponent>
  );
};

const SolverExamHeaderComponent = styled.div`
  font-family: Hanamdaum;

  & > hr:first-child {
    border-top: 2px solid #000;
    border-bottom: 1px solid #000;
    border-left: 0;
    border-right: 0;
    box-sizing: content-box;
    height: 2px;
  }
  & > hr:last-child {
    border-top: 1px solid #000;
    border-bottom: 2px solid #000;
    border-left: 0;
    border-right: 0;
    box-sizing: content-box;
    height: 2px;
  }
  & > .title {
    margin: 12px auto;
    font-weight: bold;
    text-align: center;
    & h2 {
      margin-top: 4px;
      font-size: 40px;
    }
    & p {
      font-size: 16px;
    }
  }
  & > .decoration {
    margin: 12px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 24px;

    & > div:first-child {
      border: 1px solid #000;
      border-radius: 16px;
      padding: 0 16px;
      text-align: center;
    }
    & > div:nth-child(2) {
      display: flex;
      font-size: 14px;
      & > div {
        border: 1px solid #000;
        padding: 0 16px;
      }
      & > .nickname {
        font-family: KCCChassam;
        font-size: 16px;
        color: var(--color-primary);
      }
    }
  }
`;

export default SolverExamHeader;
