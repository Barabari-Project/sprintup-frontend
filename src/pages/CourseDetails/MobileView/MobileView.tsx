import React from "react";
import "./MobileView.scss";
import courseModulesDetails from "../../../data/courseModluesDetails.json";
import CourseInfoCard from "../CourseInfoCard/CourseInfoCard";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCreative
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/effect-creative';
import { SafeHtmlComponent } from "../../../components/molecule/Carausal/Carausal";
import { nanoid } from "nanoid";

const MobileView: React.FC = () => {
  return (
    <div className={"courseInfoCarausal"}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, EffectCreative]}
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            origin: 'left center',
            translate: ['-5%', 0, -200],
            rotate: [0, 100, 0],
          },
          next: {
            origin: 'right center',
            translate: ['5%', 0, -200],
            rotate: [0, -100, 0],
          },
        }}
        // loop={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {courseModulesDetails.map((module, index) => {
          const sanitizedHtml = SafeHtmlComponent(module.title as string);
          return (
            <SwiperSlide key={nanoid()}>
              <h2 className="slideTitle">{sanitizedHtml}</h2>
              <div className={"infoMobileCard"}>
                <CourseInfoCard
                  background={module?.background}
                  src={module?.src}
                  heading={module?.heading}
                  topics={module?.topics}
                  index={index}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MobileView;
