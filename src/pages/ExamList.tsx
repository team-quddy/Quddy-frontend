import { styled } from "styled-components";
import GuideBanner from "../assets/imgs/guide_banner.png";
import useSearch from "../hooks/useSearch";
import { ExamType } from "../types/types";
import { getExamList } from "../apis/Setter";
import SearchInput from "../components/common/Search/SearchInput";
import SearchSorter from "../components/common/Search/SearchSorter";
import Footer from "../components/common/Footer/Footer";
import Loading from "../components/common/Loading/Loading";
import { useEffect, useState } from "react";
import { ResponseListType } from "../types/response";
import { throttle } from "lodash";
import ExamItem from "../components/common/ExamItem/ExamItem";
import { TbPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const ExamList = () => {
  const [list, setList] = useState<ExamType[]>([]);
  const [option, setOption, query] = useSearch<ResponseListType<ExamType>>(getExamList);
  const { text, sort } = option;

  // 검색 결과 변경 시 리스트 초기화
  useEffect(() => {
    if (query.status === "loading" && option.page == 1) setList([]);
  }, [query.status, option.page]);

  // 요청 결과를 list에 저장
  useEffect(() => {
    if (!query.data) return;
    if (query.data.page === 1) setList(query.data.list);
    else setList((pre) => [...pre, ...query.data.list]);
  }, [query.data]);

  const setOptionThrottle = throttle(() => setOption((pre) => ({ ...pre, page: option.page + 1 })), 1000);

  // 스크롤 이벤트
  const onScroll = (e: React.UIEvent) => {
    if (query.status === "loading") return;
    const target = e.target as HTMLElement;
    const bottom = target.scrollHeight - target.offsetHeight;
    if (bottom - 120 <= target.scrollTop) {
      setOptionThrottle();
    }
  };

  return (
    <TemplateComponent onScroll={onScroll}>
      <div>
        <img className="guide-banner" src={GuideBanner} alt="큐디 완벽 가이드 배너" />
        <section>
          <SearchInput
            search={text}
            setSearch={(text) => setOption((pre) => ({ ...pre, text, page: 1 }))}
            placeholder="문제집명을 검색해 빠르게 찾아보세요"
          />

          {/* 헤더 */}
          <div className="header">
            <div>
              <h1>MY 문제집</h1>
              <NavLink to="/edit">
                <TbPlus />
              </NavLink>
            </div>
            <SearchSorter option={sort} setOption={(sort) => setOption((pre) => ({ ...pre, sort, page: 1 }))} />
          </div>

          {/* 템플릿 목록 */}
          <div className="list">
            {list.map((item) => (
              <ExamItem key={item.id} exam={item} />
            ))}
          </div>

          {/* 로딩 컴포넌트 */}
          <div className={`loading ${query.status === "loading" ? "visible" : ""}`}>
            <Loading />
          </div>
        </section>
      </div>
      <Footer />
    </TemplateComponent>
  );
};

const TemplateComponent = styled.div`
  width: 100%;
  overflow-x: hidden;
  max-width: 800px;
  height: calc(100vh - 48px);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .guide-banner {
    width: 100%;
  }
  & .list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 16px;

    & > div {
      width: 100%;
    }

    @media (max-width: 800px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 344px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 266px) {
      grid-template-columns: 1fr;
    }
  }
  & section {
    margin: 12px 12px 20px;

    & h1 {
      font-size: 20px;
      font-weight: bold;
    }
    & .header {
      padding: 14px 8px 20px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > div:first-child {
        display: flex;
        align-items: center;

        & > a {
          background: none;
          border: none;
          padding: 0 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--color-primary);
        }
      }
    }
  }
  & .loading {
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
  }
`;

export default ExamList;