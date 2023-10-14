import styled from "styled-components";
import { SolverResultType } from "../../types/types";
import SolverExamHeader from "./SolverExam/SolverExamHeader";
import BackgroundImg from "../../assets/imgs/paper_background.png";
import { useMemo } from "react";
import { TbPhotoDown } from "react-icons/tb";
import * as htmlToImage from "html-to-image";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "../common/Loading/LoadingPage";
import DistributionGraph from "../common/Graph/DistributionGraph";

interface Props {
  data: SolverResultType;
}

const SolverResult = ({ data }: Props) => {
  const mutation = useMutation(async () => {
    const html = document.getElementById("result") as HTMLElement;
    const link = document.getElementById("img") as HTMLAreaElement;
    link.href = await htmlToImage.toJpeg(html);
    link.download = "완요";
    link.click();
    return;
  });

  const rank = useMemo(() => {
    if (data.percentile <= 0.04) return 1;
    if (data.percentile <= 0.11) return 2;
    if (data.percentile <= 0.23) return 3;
    if (data.percentile <= 0.4) return 4;
    if (data.percentile <= 0.6) return 5;
    if (data.percentile <= 0.77) return 6;
    if (data.percentile <= 0.89) return 7;
    if (data.percentile <= 0.96) return 8;
    return 9;
  }, [data]);

  const score = useMemo(() => {
    return Math.round((data.correct / data.problemCnt) * 100);
  }, [data]);

  const onDownloadImg = async () => {
    mutation.mutate();
  };

  return (
    <SolverResultComponent>
      <h1>채점 결과</h1>
      <section className="result" id="result">
        {mutation.status === "loading" ?? <LoadingPage />}
        <SolverExamHeader />

        <div className="score">
          <div className="percentile">
            <p>상위 {data.percentile * 100}%</p>
            <p className="rank">{rank}등급</p>
          </div>
          <p>
            {score}점<span>/100점</span>
          </p>
        </div>

        <div className="graph">
          {/* <div style={{ marginLeft: `${(10 - rank) * 10}%` }} /> */}
          <DistributionGraph size={"10%"} x={`${(10 - rank) * 10}%`} />
        </div>

        <div className="interaction">
          <button type="button" className="round-btn">
            점수 자랑하기
          </button>
          <button type="button" className="circle-btn" onClick={onDownloadImg}>
            <TbPhotoDown />
          </button>
        </div>
      </section>

      <div>
        <p>닉네임님만의 문제집도 출제해볼까요?</p>
        <button type="button" className="round-btn">
          출제하러 가기
        </button>
        <a id="img">asdf</a>
      </div>
    </SolverResultComponent>
  );
};

const SolverResultComponent = styled.main`
  padding: 0 16px;

  & h1 {
    color: var(--color-primary);
    font-size: 24px;
    font-weight: bold;
    margin: 72px 12px 24px;
  }

  & > section.result {
    display: flex;
    flex-direction: column;
    width: auto;
    padding: 16px;
    background-image: url(${BackgroundImg});
    background-position: center;
    background-size: 100%;
    background-color: var(--color-theme);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    & > .score {
      width: 100%;
      font-family: Hanamdaum;
      color: var(--color-primary);
      max-width: 320px;
      margin: auto;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 14px;

      & > .percentile {
        margin: 4px auto auto 14px;
        text-align: center;
        font-size: 1em;
        line-height: 1.5em;
        & > p:last-child {
          font-weight: bold;
          font-size: 1.5em;
        }
      }

      & > p {
        margin: 4px 14px 4px auto;
        font-weight: bold;
        font-size: 3.5em;
        & > span {
          font-weight: normal;
          font-size: 0.25em;
        }
      }
    }

    & > .graph {
      width: 100%;
      margin: 0;
    }

    & > .interaction {
      align-self: center;
      width: 100%;
      max-width: 280px;
      display: flex;
      /* margin: auto; */
      padding: 28px 0;
      align-items: center;
      justify-content: space-between;

      & > button {
        height: 60px;
        padding: 0;
        flex: 1 1 0;
        line-height: 60px;
        font-size: 20px;
      }

      & > .circle-btn {
        flex: 0 0 60px;
        color: var(--color-primary);
        background-color: var(--color-background);
        margin-left: 16px;
        border: 0;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        aspect-ratio: 1;
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  & .round-btn {
    background-color: var(--color-primary);
    color: #fff;
    font-family: Hanamdaum;
    font-weight: bold;
    font-size: 24px;
    border: 0;
    border-radius: 36px;
    width: auto;
    padding: 0 36px;
    line-height: 72px;
  }

  & > div:last-child {
    color: var(--color-primary);
    text-align: center;
    margin-top: 48px;
    & > button {
      margin: 16px;
    }
  }

  & > div > a {
    display: none;
  }
`;

export default SolverResult;
