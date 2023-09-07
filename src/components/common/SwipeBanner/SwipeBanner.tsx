import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { styled } from "styled-components";
import { BannerType } from "../../../types/types";

interface Props {
  data: BannerType[];
}

const SwipeBanner = ({ data }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // TODO: 배너 클릭 이벤트 만들기
    console.log(e.currentTarget.dataset.id);
  };

  return (
    <SwipeBannerComponent>
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        loopedSlides={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}>
        {data.map((item) => (
          <SwiperSlide key={item.id} onClick={onClick} data-id={item.id}>
            <img src={item.thumbnail} alt={item.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwipeBannerComponent>
  );
};

const SwipeBannerComponent = styled.div`
  background-color: var(--color-background);
  position: relative;

  & > div {
    width: 100%;
    aspect-ratio: 2;
    z-index: 1;

    & .swiper-slide {
      display: flex;
      & > * {
        width: 100%;
        align-self: center;
      }
    }
    & .swiper-pagination-bullet {
      transition: all 200ms;
      background-color: white;
      opacity: 0.625;
      &.swiper-pagination-bullet-active {
        transform: scale(1.3);
        opacity: 1;
      }
    }

    /* 이미지 하단 페이드아웃 처림 */
    &::after {
      content: "";
      position: absolute;
      z-index: 9;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    }
  }
`;

export default SwipeBanner;
