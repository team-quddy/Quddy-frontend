import { styled } from "styled-components";
import GuideBanner from "../assets/imgs/guide_banner.png";
import useSearch from "../hooks/useSearch";
import { ExamTemplateType } from "../types/types";
import { getExamTemplateList } from "../apis/Setter";
import SearchInput from "../components/common/Search/SearchInput";
import SearchSorter from "../components/common/Search/SearchSorter";

const Template = () => {
  const [option, setOption, query] = useSearch<ExamTemplateType[]>(getExamTemplateList);
  const { text, sort } = option;

  return (
    <TemplateComponent>
      <img className="guide-banner" src={GuideBanner} alt="큐디 완벽 가이드 배너" />
      <section>
        <SearchInput search={text} setSearch={(text) => setOption((pre) => ({ ...pre, text }))} placeholder="asdf" />

        <div className="header">
          <h1>문제집 템플릿</h1>
          <SearchSorter option={sort} setOption={(sort) => setOption((pre) => ({ ...pre, sort }))} />
        </div>
      </section>
    </TemplateComponent>
  );
};

const TemplateComponent = styled.div`
  & .guide-banner {
    width: 100%;
  }
  & > section {
    padding: 12px 20px;
  }
  & h1 {
    font-size: 20px;
    font-weight: bold;
  }
  & .header {
    margin-top: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default Template;
