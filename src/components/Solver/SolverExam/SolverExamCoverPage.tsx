import { styled } from "styled-components";
import BackgroundImg from "../../../assets/imgs/paper_background.png";
import RoundButton from "../../common/Button/RoundButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, postCreateUser } from "../../../apis/Setter";
import LoadingPage from "../../common/Loading/LoadingPage";
import { useState } from "react";

interface Props {
  title: string;
  onMoveNextProblem(): void;
}

const SolverExamCoverPage = ({ title, onMoveNextProblem }: Props) => {
  const [nickname, setNickname] = useState<string>("");
  const query = useQuery(["getUser"], getUserInfo, {
    retry: false,
    onSuccess: (data) => {
      setNickname(data.nickname);
    },
  });
  const mutation = useMutation(() => postCreateUser(nickname), {
    onSuccess: async () => {
      await query.refetch();
      onStartTest();
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
  };

  const onStartTest = async () => {
    if (query.status === "error") mutation.mutate();
    else onMoveNextProblem();
  };

  return (
    <>
      {(query.status === "loading" || mutation.status === "loading") && <LoadingPage />}
      <ExamPageComponent>
        <div className="title">
          <p>2023년도 10월 큐디고사</p>
          <h2>{title}</h2>
        </div>

        <div className="decoration">
          <div>제 1교시</div>

          <div>
            <div>
              <div>성명</div>
              <div className="nickname" />
            </div>
            <div>
              <div>수험번호</div>
              <div />
              <div />
              <div />
              <div />
              <div>-</div>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>

        <div className="notice">
          <p>○ 문제지의 해당란에 성명과 수험번호를 정확히 쓰시오.</p>
          <p>○ 마음 속에 다음의 문구를 정자로 기재하시오.</p>
          <div>우정은 날개없는 사랑이다</div>
          <p>○ 해당 사이트는 재미로만 즐기시오.</p>
          <p>○ 본 시험은 한 번만 치를 수 있음에 유의하시오.</p>
        </div>

        <div className="solver">
          <p>※ 응시자명을 입력 후 시험을 시작해주세요.</p>
          <input value={nickname} onChange={onChange} disabled={query.isSuccess} />
        </div>
      </ExamPageComponent>
      <RoundButton type="button" className="start-btn" onClick={onStartTest} disabled={!nickname}>
        시험 시작
      </RoundButton>
    </>
  );
};

const ExamPageComponent = styled.div`
  font-family: Hanamdaum;
  width: auto;
  max-width: 400px;
  margin: auto;
  padding: 16px;
  background-image: url(${BackgroundImg});
  background-position: center;
  background-size: 100%;
  background-color: var(--color-theme);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  & > .title {
    margin: 12px auto;
    font-weight: bold;
    text-align: center;
    & h2 {
      margin-top: 4px;
      font-size: 36px;
    }
    & p {
      font-size: 16px;
    }
  }

  & > .decoration {
    margin: 20px auto;
    line-height: 20px;
    font-size: 14px;
    position: relative;

    & > div:first-child {
      width: fit-content;
      transform: scale(0.8) translateX(-20%);
      border: 1px solid #000;
      border-radius: 12px;
      padding: 0 8px;
      text-align: center;
    }

    & > div:last-child {
      position: absolute;
      right: 0;
      top: 0;
      transform: scale(0.8) translateX(15%);
      font-size: 12px;
      display: flex;

      & > div:nth-child(1) {
        margin-right: 8px;
        display: flex;
        width: 100px;
        & > div {
          border: 1px solid #000;
          text-align: center;
          flex: 0 1 40px;
        }
        & > .nickname {
          border-left: 0;
          flex: 1 2 0;
        }
      }
      & > div:nth-child(2) {
        display: flex;
        width: 180px;

        & > div:first-child {
          border: 1px solid #000;
          flex: 0 1 56px;
        }
        & > div {
          border: 1px solid #000;
          border-left: 0;
          text-align: center;
          flex: 1 1 0;
        }
      }
    }

    @media (min-width: 420px) {
      & > div {
        transform: none !important;
      }
    }
  }

  & > .notice {
    border: 1px solid var(--color-text);
    padding: 12px 16px;
    font-size: 12px;

    & > p {
      margin: 8px 0;
    }
    & > div {
      background-color: var(--color-gray);
      padding: 8px;
      text-align: center;
      font-weight: bold;
    }
  }

  & > .solver {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > p {
      font-size: 14px;
      text-align: center;
    }
    & > input {
      margin: 16px 32px;
      width: 100%;
      max-width: 240px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      border: 1px solid var(--color-primary);
      text-align: center;
      font-family: KCCChassam;
    }
  }
`;

export default SolverExamCoverPage;
