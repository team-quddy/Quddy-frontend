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
      <SearchInput search={text} setSearch={(text) => setOption((pre) => ({ ...pre, text }))} />
      <section>
        <div>
          <h1>문제집 템플릿</h1>
          <SearchSorter option={sort} setOption={(sort) => setOption((pre) => ({ ...pre, sort }))} />
        </div>
      </section>
    </TemplateComponent>
  );
};

const TemplateComponent = styled.div``;

export default Template;
