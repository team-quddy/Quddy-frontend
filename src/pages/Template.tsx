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

const Template = () => {
  const [option, setOption, query] = useSearch<ExamTemplateType[]>(getExamTemplateList);
  const { text, sort } = option;

  return (
    <TemplateComponent>
      <div>
        <img className="guide-banner" src={GuideBanner} alt="큐디 완벽 가이드 배너" />
        <section>
          <SearchInput search={text} setSearch={(text) => setOption((pre) => ({ ...pre, text }))} placeholder="asdf" />

          {/* 헤더 */}
          <div className="header">
            <h1>문제집 템플릿</h1>
            <SearchSorter option={sort} setOption={(sort) => setOption((pre) => ({ ...pre, sort }))} />
          </div>

          {/* 템플릿 목록 */}
          <div className="list">
            {query.data?.map((item) => (
              <ExamTemplateItem key={item.id} exam={item} />
            ))}
          </div>

          {/* 로딩 컴포넌트 */}
          {query.status === "loading" ? <Loading /> : undefined}
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
  min-height: calc(100vh - 48px);
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
    margin: 12px 8px 20px;

    & h1 {
      font-size: 20px;
      font-weight: bold;
    }
    & > *:first-child {
      margin: 0 4px;
    }
    & .header {
      padding: 14px 12px 20px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export default Template;
