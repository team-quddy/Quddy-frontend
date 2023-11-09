import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import BackBtn from "../components/common/BackBtn/BackBtn";
import { TbBallpen, TbGitFork, TbLock, TbLockOpen, TbShare2, TbTrophy } from "react-icons/tb";
import Footer from "../components/common/Footer/Footer";
import ProblemViewStatAccordion from "../components/Setter/Problem/ProblemView/ProblemViewStatAccordion";
import { useMemo } from "react";
import { ExamDetailStatType, ProblemStatType } from "../types/types";
import { onShareURL } from "../utils/event";

const ExamDetail = () => {
  const id = useParams().id as string;
  const data = useLoaderData() as ExamDetailStatType<ProblemStatType>;
  const navigate = useNavigate();

  /** 템플릿 공유 이벤트 */
  const onShareTemplate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const url = `${import.meta.env.VITE_APP_CLIENT_URL}/template/${id}`;
    await navigator.clipboard.writeText(url);

    // TODO: 사용자에게 알림 제공
    alert("클립보드에 복사되었습니다!");
  };

  /** 변경 이벤트 */
  const onModify = () => {
    navigate(`/edit?id=${id}`);
  };

  /** 문제집 응시 링크 공유 이벤트 */
  const onShareExam = async (e: React.MouseEvent<HTMLButtonElement>) => onShareURL(e, `solver/exam/${id}`);

  /** 평균 점수 */
  const solverAvg: number = useMemo(() => {
    if (!data) return 0;
    const sum = data.problems.reduce((_sum, problem) => _sum + problem.correct, 0);

    // 최대 소수점 1자리까지 보여줍니다
    return Math.round((sum / (data.total * data.cnt)) * 1000) / 10;
  }, [data]);

  return (
    <ExamDetailComponent>
      <main>
        <BackBtn />

        {/* 문제집 템플릿 기본 정보 */}
        <section className="exam-info">
          <div className="thumbnail">
            <img src={data?.thumbnail} alt="썸네일" />
          </div>

          <div className="info">
            <div className="info-area">
              <h1>{data?.title || "문제집 타이틀명"}</h1>
              <p className="isPublic">
                {data?.isPublic ? (
                  <>
                    공개 <TbLockOpen />
                  </>
                ) : (
                  <>
                    비공개 <TbLock />
                  </>
                )}
              </p>
              {data?.isPublic ? (
                <div className="scrap">
                  <TbGitFork /> {data?.scrap || 0}
                </div>
              ) : undefined}
            </div>
            <div className="interact-area">
              <button type="button" onClick={onShareTemplate} className="share-template-btn" disabled={!data?.isPublic}>
                템플릿 공유하기 <TbShare2 />
              </button>
              <button type="button" onClick={onModify} className="modify-btn">
                문제집 수정
              </button>
            </div>
          </div>
          <button type="button" className="share-exam-btn" onClick={onShareExam}>
            응시링크 공유하기
          </button>
        </section>

        {/* 문제집 통계 정보 */}
        <section className="stat">
          <h2>문제집 통계</h2>
          <div className="stat-summary">
            <div className="solver-amount">
              <TbBallpen />
              <div>
                <p className="title">응시자 수</p>
                <p>{data?.total || "-"}</p>
              </div>
            </div>

            <div className="solver-average">
              <TbTrophy />
              <div>
                <p className="title">평균 점수</p>
                <p>{solverAvg}</p>
              </div>
            </div>
          </div>

          <h3>문제집 정답률</h3>
          <div className="problem-graph">
            <div>
              <div>평균</div>
              <div className="gauge">
                <div style={{ width: `${solverAvg}%` }} />
              </div>
              <div>{solverAvg}%</div>
            </div>

            {data?.problems.map((problem, idx) => (
              <div key={`problem-avg-${idx}`}>
                <div>
                  <span>{idx + 1}</span>번
                </div>
                <div className="gauge">
                  <div style={{ width: `${(problem.correct / data.total) * 100}%` }} />
                </div>
                <div>{Math.round((problem.correct / data.total) * 1000) / 10}%</div>
              </div>
            ))}
          </div>

          {Boolean(data.total) || <div className="blur">아직 문제집을 푼 사람이 없어요!</div>}
        </section>

        {/* 문제집 문제 목록 */}
        <section className="problem-list">
          <h2>문제 목록</h2>

          <div className="list">
            {data?.problems.map((problem, idx) => (
              <ProblemViewStatAccordion key={`${id}-${idx}`} no={idx + 1} problem={problem} total={data.total} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </ExamDetailComponent>
  );
};

const ExamDetailComponent = styled.div`
  margin: auto;
  min-height: calc(100vh - 48px);
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > main {
    box-sizing: border-box;
    padding: 24px 20px 56px;

    display: flex;
    flex-direction: column;

    & > button:first-child {
      align-self: baseline;
    }

    & > section.exam-info {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 12px;
        width: calc(100% - 24px);
        height: 100%;
        pointer-events: none;
        transition: backdrop-filter 100ms;
        backdrop-filter: blur(4px) opacity(0);
      }

      &.loading::after {
        backdrop-filter: blur(4px) opacity(1);
        -webkit-backdrop-filter: blur(4px);
      }

      & > .thumbnail {
        background-color: var(--color-light-gray);
        border-radius: 8px;
        width: 40%;
        max-width: 300px;
        aspect-ratio: 0.75;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;

        & > img {
          max-width: 100%;
          max-height: 100%;
          margin: auto;
          display: none;
          &[src] {
            display: block;
          }
        }
      }

      & > .info {
        margin-left: 12px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & > .info-area {
          & h1 {
            font-size: 20px;
            font-weight: bold;
            line-height: 28px;
          }
          & .isPublic {
            font-size: 12px;
            line-height: 16px;

            & svg {
              font-size: 14px;
              margin-bottom: -4px;
              color: var(--color-primary);
            }
          }
          & .scrap {
            height: 24px;
            color: var(--color-primary);
            font-size: 11px;
            display: flex;
            align-items: center;
            font-weight: bold;
            & > svg {
              font-size: 16px;
            }
          }
        }

        & > .interact-area {
          display: flex;
          flex-direction: column;
          align-items: end;

          & > .share-template-btn {
            background: none;
            border: none;
            font-size: 12px;

            & svg {
              color: var(--color-primary);
              font-size: 20px;
              margin-bottom: -5px;
            }

            &:disabled svg {
              opacity: 0.5;
            }
          }

          & > .modify-btn {
            width: 100%;
            height: 40px;
            font-size: 14px;
            font-weight: bold;
            color: var(--color-primary);
            background-color: var(--color-light-gray);
            border: none;
            /* border: 1px solid var(--color-primary); */
            border-radius: 8px;
            margin-top: 8px;
          }
        }
      }
      & > .share-exam-btn {
        flex: 1 0 100%;
        margin: 12px 0;
        border: none;
        border-radius: 8px;
        background-color: var(--color-primary);
        color: var(--color-theme);
        font-size: 14px;
        font-weight: bold;
        height: 40px;
      }
    }

    & > section.stat {
      margin-top: 28px;
      position: relative;

      & > h2 {
        font-size: 16px;
        font-weight: bold;
      }

      & .stat-summary {
        display: flex;
        align-items: center;
        justify-content: center;
        & > div {
          width: 100%;
          margin: 12px 6px;
          border-radius: 8px;
          padding: 12px;
          background-color: var(--color-background);
          color: var(--color-primary);

          display: flex;
          align-items: center;
          & > svg {
            font-size: 32px;
            margin-right: 6px;
          }
          & > div {
            & > .title {
              font-size: 12px;
              font-weight: 400;
              margin-bottom: 4px;
            }
            & > * {
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }

      & > h3 {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        margin-top: 8px;
      }
      & > .problem-graph {
        margin-top: 8px;
        & > div {
          display: flex;
          align-items: center;

          & > div:first-child {
            flex: 0 0 48px;
            padding: 8px;
            font-size: 12px;
            border-right: 1px solid var(--color-gray);
            display: flex;
            & > span {
              font-size: 10px;
              text-align: center;
              display: block;
              border: 1px solid var(--color-text);
              border-radius: 50%;
              aspect-ratio: 1;
              height: 12px;
            }
          }

          & > div.gauge {
            height: 16px;
            flex: 1 1 0;
            background-color: var(--color-light-gray);
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            overflow: hidden;
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1) inset;

            & > div {
              box-shadow: 2px 0px 8px 1px rgba(0, 0, 0, 0.2);
              background-color: var(--color-primary);
              height: 100%;
              display: block;
              border-top-right-radius: 6px;
              border-bottom-right-radius: 6px;

              animation-duration: 2000ms;
              animation-name: fill;

              @keyframes fill {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
            }
          }

          & > div:last-child {
            padding: 8px 8px 8px 0;
            font-size: 10px;
            width: 44px;
            text-align: right;
            color: var(--color-primary);
          }
        }
      }

      & > .blur {
        position: absolute;
        font-size: 14px;
        top: 24px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff80;
        backdrop-filter: blur(4px) opacity(1);
      }
    }

    & > section.problem-list {
      & > h2 {
        margin-top: 28px;
        font-size: 16px;
        font-weight: bold;
      }
      & .list > div {
        margin: 12px 0;
      }
    }
  }
`;

export default ExamDetail;
