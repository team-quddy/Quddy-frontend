import { styled } from "styled-components";
import SwipeBanner from "../components/common/SwipeBanner/SwipeBanner";
import Footer from "../components/common/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import GuideBanner from "../assets/imgs/guide_banner.png";

// 임시 데이터
import BannerData from "../apis/sample/Banner.json";
import ExamData from "../apis/sample/Exam.json";
import ExamTemplateItem from "../components/common/ExamTemplateItem/ExamTemplateItem";
import ExamItem from "../components/common/ExamItem/ExamItem";
import { TbArrowRight } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <MainPage>
      <SwipeBanner data={BannerData} />

      <img className="guide-banner" src={GuideBanner} alt="큐디 완벽 가이드 배너" />

      <section>
        <h1>🔥지금 인기있는 문제집</h1>
        <Swiper className="slider" spaceBetween={8} slidesPerView={"auto"} freeMode={true} modules={[FreeMode]}>
          {ExamData.map((item) => (
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

      <section>
        <h1>📚내가 만든 문제집</h1>
        <Swiper className="slider" spaceBetween={8} slidesPerView={"auto"} freeMode={true} modules={[FreeMode]}>
          {ExamData.map((item) => (
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
