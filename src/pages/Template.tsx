import { styled } from "styled-components";
import GuideBanner from "../assets/imgs/guide_banner.png";
import useSearch from "../hooks/useSearch";
import { ExamTemplateType } from "../types/types";
import { getExamTemplateList } from "../apis/Setter";
import SearchInput from "../components/common/Search/SearchInput";
import SearchSorter from "../components/common/Search/SearchSorter";
import Footer from "../components/common/Footer/Footer";
import Loading from "../components/common/Loading/Loading";
import ExamTemplateItem from "../components/common/ExamTemplateItem/ExamTemplateItem";
import { useEffect, useState } from "react";
import { ResponseListType } from "../types/response";
import { throttle } from "lodash";
import TopBtn from "../components/common/TopBtn/TopBtn";
import TemplateEmpty from "../components/Setter/Template/TemplateEmpty/TemplateEmpty";

const Template = () => {
  const [list, setList] = useState<ExamTemplateType[]>([]);
  const [option, setOption, query] = useSearch<ResponseListType<ExamTemplateType>>(getExamTemplateList);
  const { keyword, sort } = option;

  // 검색 결과 변경 시 리스트 초기화(로딩 표기용)
  useEffect(() => {
    if (query.status === "loading" && option.page == 0) setList([]);
  }, [query.status, option.page]);

  // 요청 결과를 list에 저장
  useEffect(() => {
    if (!query.data) return;
    if (query.data.page === 0) setList(query.data.list);
    else setList((pre) => [...pre, ...query.data.list]);
  }, [query.data]);

  const setOptionThrottle = throttle(() => setOption((pre) => ({ ...pre, page: option.page + 1 })), 1000);

  // 스크롤 이벤트
  const onScroll = (e: React.UIEvent) => {
    if (query.status === "loading") return;
    // 마지막 페이지인 경우 요청을 보내지 않음
    if (query.data && query.data.list.length < option.size) return;

    const target = e.target as HTMLElement;
    const bottom = target.scrollHeight - target.offsetHeight;
    if (bottom - 160 <= target.scrollTop) {
      setOptionThrottle();
    }
  };

  return (
    <TemplateComponent onScroll={onScroll}>
      <div>
        <img className="guide-banner" src={GuideBanner} alt="큐디 완벽 가이드 배너" />
        <section>
          <SearchInput
            search={keyword}
            setSearch={(keyword) => setOption((pre) => ({ ...pre, keyword, page: 0 }))}
            placeholder="관심있는 키워드를 검색해보세요"
          />

          {/* 헤더 */}
          <div className="header">
            <h1>문제집 템플릿</h1>
            <SearchSorter option={sort} setOption={(sort) => setOption((pre) => ({ ...pre, sort, page: 0 }))} />
          </div>

          {/* 템플릿 목록 */}
          <div className="list">
            {list.map((item) => (
              <ExamTemplateItem key={item.id} exam={item} />
            ))}
          </div>

          {/* 로딩 컴포넌트 */}
          <div className={`loading ${query.status === "loading" ? "visible" : ""}`}>
            <Loading />
          </div>

          {query.status !== "loading" && !list.length ? <TemplateEmpty /> : undefined}

          {list.length && query.data && query.data.list.length < option.size ? (
            <p className="endline">목록의 마지막입니다</p>
          ) : undefined}
        </section>
      </div>
      <TopBtn />

      {query.status === "loading" || <Footer />}
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

  & > div:first-child {
    flex: 1 1 0;
  }

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
    }
  }
  & .loading {
    height: 32px;
    visibility: hidden;
    &.visible {
      visibility: visible;
      height: 160px;
    }
  }
  & p.endline {
    margin-top: 24px;
    font-size: 10px;
    color: var(--color-primary);
    text-align: center;
  }
`;

export default Template;
