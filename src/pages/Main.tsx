import { styled } from "styled-components";
import SwipeBanner from "../components/common/SwipeBanner/SwipeBanner";
import Footer from "../components/common/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import GuideBanner from "../assets/imgs/guide_banner.png";
import BannerData from "../apis/sample/Banner.json";
import { TbArrowRight } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExamList, getExamTemplateList } from "../apis/Setter";
import { SearchTarget, Sort } from "../types/search";
import BlankExamItem from "../components/common/ExamItem/BlankExamItem";
import ExamTemplateItem from "../components/common/ExamTemplateItem/ExamTemplateItem";
import BlankExamTemplateItem from "../components/common/ExamTemplateItem/BlankExamTemplateItem";
import ExamItem from "../components/common/ExamItem/ExamItem";

const Main = () => {
  const examQuery = useQuery(["latestExam"], () =>
    getExamList({
      keyword: "",
      target: SearchTarget.title,
      sort: Sort.latest,
      page: 0,
      size: 5,
    })
  );
  const templateQuery = useQuery(["popularTemplate"], () =>
    getExamTemplateList({
      keyword: "",
      target: SearchTarget.title,
      sort: Sort.popular,
      page: 0,
      size: 5,
    })
  );

  return (
    <MainPage>
      <SwipeBanner data={BannerData} />

      <img className="guide-banner" src={GuideBanner} alt="큐디 완벽 가이드 배너" />

      <section>
        <h1>🔥지금 인기있는 문제집</h1>
        <Swiper className="slider" spaceBetween={8} slidesPerView={"auto"} freeMode={true} modules={[FreeMode]}>
          {templateQuery.status === "loading" &&
            [1, 2, 3, 4, 5].map((index) => (
              <SwiperSlide key={index}>
                <BlankExamTemplateItem />
              </SwiperSlide>
            ))}

          {templateQuery.data?.list.map((item) => (
            <SwiperSlide key={item.id}>
              <ExamTemplateItem exam={item} />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <div className="more-btn">
              <NavLink to="/template">
                더보기
                <TbArrowRight />
              </NavLink>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      {examQuery.status !== "error" && (
        <section>
          <h1>📚내가 만든 문제집</h1>
          <Swiper className="slider" spaceBetween={8} slidesPerView={"auto"} freeMode={true} modules={[FreeMode]}>
            {examQuery.status === "loading" &&
              [1, 2, 3, 4, 5].map((index) => (
                <SwiperSlide key={index}>
                  <BlankExamItem />
                </SwiperSlide>
              ))}
            {examQuery.data?.list.map((item) => (
              <SwiperSlide key={item.id}>
                <ExamItem exam={item} />
              </SwiperSlide>
            ))}

            <SwiperSlide>
              <div className="more-btn">
                <NavLink to="/exam">
                  더보기
                  <TbArrowRight />
                </NavLink>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      )}
      <Footer />
    </MainPage>
  );
};

const MainPage = styled.div`
  max-width: 800px;
  margin: auto;
  & h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 40px 20px 12px;
  }
  & .guide-banner {
    width: 100%;
    margin-top: 12px;
  }
  & .slider {
    padding: 0 20px;
    & .swiper-slide {
      width: auto;
    }
  }
  & .more-btn {
    width: 120px;
    height: 180px;
    & > * {
      margin: 60px auto;
      background-color: var(--color-primary);
      opacity: 0.5;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      padding-top: 10px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--color-theme);
      font-weight: bold;
    }
  }
  & > footer {
    margin-top: 60px;
  }
`;

export default Main;
