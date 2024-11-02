import React from "react";
import Slider from "react-slick";
import { BlogCarausalData } from "../../../types/types";
import Lottie from "react-lottie-player";
import loaderDats from "../../../Lottie/loaderSmall.json";
import "./styles.scss";

const BlogCarusal: React.FC<{ data: BlogCarausalData[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };
  return (
    <div className="blogCarausal">
      {loading ? (
        <div className="blogCarausal__loader">
          <Lottie
            animationData={loaderDats}
            play
            style={{ width: 300, height: 300 }}
          />
        </div>
      ) : data.length > 0 ? (
        <Slider {...sliderSettings}>
          {data.map((item) => (
            <div key={item._id} className="carausalSlide">
              <div
                style={{ background: `url(${item.image})` }}
                className="carausalData"
              >
                <div className="content">
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default BlogCarusal;
