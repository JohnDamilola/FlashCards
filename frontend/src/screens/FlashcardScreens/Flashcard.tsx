import React, { Fragment, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { Pagination, Navigation } from "swiper";

export default function Flashcard() {
  return (
        <><Fragment>
      <h1 className="card-title text-center my-3">Title </h1>
    </Fragment><Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
        <SwiperSlide className="flip-card">
          <div className= "flip-card-inner">
            <div className="flip-card-front center">
                Slide 1 Front
            </div>
            <div className="flip-card-back center">
                Slide 1 Back
            </div>
         </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper></>
  );
}
