import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import BackBtn from "../components/common/BackBtn/BackBtn";
import { useQuery } from "@tanstack/react-query";
import { getExamTemplateById } from "../apis/Setter";
import { TbGitFork, TbShare2 } from "react-icons/tb";
import Footer from "../components/common/Footer/Footer";
import ProblemViewAccordion from "../components/Setter/Problem/ProblemView/ProblemViewAccordion";

const TemplateDetail = () => {
  const id = useParams().id as string;
  const query = useQuery(["templateDetail", id], () => getExamTemplateById(id));
  const { data } = query;
  const navigate = useNavigate();

  /** 템플릿 공유 이벤트 */
  const onShareTemplate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const url = `${import.meta.env.VITE_APP_CLIENT_URL}/template/${id}`;
    navigator.clipboard.writeText(url);

    // TODO: 사용자에게 알림 제공
    alert("클립보드에 복사되었습니다!");
  };

  /** 템플릿 사용 이벤트 */
  const onUseTemplate = () => {
    // TODO: edit 페이지와의 연동 이벤트 추가
    navigate(`/edit?id=${id}&template=true`);
  };

  return (
    <TemplateDetailComponent>
      <main>
        <BackBtn />

        {/* 문제집 템플릿 기본 정보 */}
        <section className="exam-info">
          <div className="thumbnail">
            <img src={data?.thumbnail} alt="썸네일" />
          </div>

          <div className="info">
            <div className="info-area">
              <h1>{data?.title || "-"}</h1>
              <p className="owner">{data?.owner || "-"}</p>
              <div className="scrap">
                <TbGitFork /> {data?.scrap || 0}
              </div>
            </div>
            <div className="interact-area">
              <button type="button" onClick={onShareTemplate} className="share-template-btn">
                템플릿 공유하기 <TbShare2 />
              </button>
              <button type="button" onClick={onUseTemplate} className="use-template-btn">
                이 템플릿으로 만들기
              </button>
            </div>
          </div>
        </section>

        {/* 문제집 문제 목록 */}
        <section className="problem-list">
          <h2>문제 목록</h2>

          <div className="list">
            {data?.problems.map((problem, idx) => (
              <ProblemViewAccordion key={`${id}-${idx}`} no={idx + 1} problem={problem} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </TemplateDetailComponent>
  );
};

const TemplateDetailComponent = styled.div`
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
          &[src=""] {
            display: none;
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
          & .owner {
            font-size: 12px;
            line-height: 16px;
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
          }

          & > .use-template-btn {
            width: 100%;
            height: 40px;
            font-size: 14px;
            font-weight: bold;
            color: #ffffff;
            background-color: var(--color-primary);
            border: none;
            border-radius: 8px;
            margin-top: 8px;
          }
        }
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

export default TemplateDetail;
