import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.scss";

import { Pagination, Navigation } from "swiper";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function Flashcard() {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <SwiperSlide>
              <Card
                index={index}
                total={4}
                front={"Noun"}
                back={"A name of any person, animal, place or thing"}
              />
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <div className="card-item final-view">
            <div>
              <p>Yaaay! You have come to the end of your practice 🎉🎊</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

const Card = ({ front, back, index, total }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
        <div>
          <p>Front</p>
          <h2>{front}</h2>
        </div>
        <div className="bottom">
            <p>{index + 1} / {total}</p>
        </div>
      </div>
      <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
        <div>
          <p>Back</p>
          <h2>{back}</h2>
        </div>
        <div className="bottom">
            <p>{index + 1} / {total}</p>
        </div>
      </div>
    </ReactCardFlip>
  );
};
