import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./custom-swiper.scss";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

type CustomSwiper = {
  children: React.ReactNode;
};

const CustomSwiper = ({ children }: CustomSwiper) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {childrenArray.map((child) => (
          <SwiperSlide key={uuidv4()}>{child}</SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev">
            <div className="slider-arrow"></div>
          </div>
          <div className="swiper-button-next">
            <div className="slider-arrow"></div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default CustomSwiper;

