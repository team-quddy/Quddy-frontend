import styled from "styled-components";
import SolverExamHeader from "../components/Solver/SolverExam/SolverExamHeader";
import BackgroundImg from "../assets/imgs/paper_background.png";
import { useCallback, useMemo } from "react";
import { TbPhotoDown } from "react-icons/tb";
import * as htmlToImage from "html-to-image";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "../components/common/Loading/LoadingPage";
import DistributionGraph from "../components/common/Graph/DistributionGraph";
import { throttle } from "lodash";
import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { ResponseSolverExamResultType } from "../types/response";
import { onShareURL } from "../utils/event";

const SolverResult = () => {
  const id = useParams().id;
  const data = useLoaderData() as ResponseSolverExamResultType;
  const { exam, result } = data;

  const rank = useMemo(() => {
    if (result.percentile <= 0.04) return 1;
    if (result.percentile <= 0.11) return 2;
    if (result.percentile <= 0.23) return 3;
    if (result.percentile <= 0.4) return 4;
    if (result.percentile <= 0.6) return 5;
    if (result.percentile <= 0.77) return 6;
    if (result.percentile <= 0.89) return 7;
    if (result.percentile <= 0.96) return 8;
    return 9;
  }, [result]);

  const downloadImgMutation = useMutation(async () => {
    const html = document.getElementById("result") as HTMLElement;
    const link = document.getElementById("img") as HTMLAreaElement;
    await new Promise((res) => setTimeout(res, 2000));

    link.href = await htmlToImage.toJpeg(html);
    link.download = `${exam.title} 성적표`;
    link.click();
    return;
  });
  const debounceDownloadImg = useMemo(() => throttle(downloadImgMutation.mutate, 500), [downloadImgMutation]);
  const onDownloadImg = useCallback(() => debounceDownloadImg(), [debounceDownloadImg]);
  const onShareResult = (e: React.MouseEvent<HTMLButtonElement>) => onShareURL(e, `solver/result/${id}`);

  return (
    <SolverResultComponent>
      <h1>채점 결과</h1>
      <section className="result" id="result">
        {downloadImgMutation.status === "loading" && <LoadingPage />}
        <SolverExamHeader title={exam.title} />

        <div className="score">
          <div className="percentile">
            <p>상위 {result.percentile * 100}%</p>
            <p className="rank">{rank}등급</p>
          </div>
          <p>
            {Math.round((result.correct / result.problemCnt) * 100)}점<span>/100점</span>
          </p>
        </div>

        <div className="graph">
          {/* <div style={{ marginLeft: `${(10 - rank) * 10}%` }} /> */}
          <DistributionGraph size={"10%"} x={`${(10 - rank) * 10}%`} />
        </div>

        <div className="interaction">
          <button type="button" className="round-btn" onClick={onShareResult}>
            점수 자랑하기
          </button>
          <button type="button" className="circle-btn" onClick={onDownloadImg}>
            <TbPhotoDown />
          </button>
        </div>
      </section>

      <div>
        <p>나만의 문제집도 출제하고 공유해보세요!</p>
        <NavLink to={"/"} className="round-btn">
          출제하러 가기
        </NavLink>
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
    display: block;
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
    & > .round-btn {
      margin: 16px auto;
      width: fit-content;
    }
  }

  & > div > a#img {
    display: none;
  }
`;

export default SolverResult;
