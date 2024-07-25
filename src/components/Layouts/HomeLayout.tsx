import React, { useEffect } from "react";
import Header from "../organisms/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
import "./HomeLayout.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-creative";
import "swiper/scss/autoplay";
import { Autoplay } from "swiper/modules";
import heighlightedPoints from "../../data/highlightedPoints.json";
import { nanoid } from "nanoid";

const HomeLayout: React.FC = () => {
  const location = useLocation().pathname;

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <div className="header-highlight">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {heighlightedPoints.map((point) => (
            <SwiperSlide key={nanoid()}>
              <p>{point}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
