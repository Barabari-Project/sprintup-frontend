import React from "react";
import Slider from "react-slick";
import { BlogCarausalData } from "../../../types/types";
import Lottie from "react-lottie-player";
import loaderDats from "../../../Lottie/loaderSmall.json";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const BlogCarusal: React.FC<{ data: BlogCarausalData[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  const navigate = useNavigate();
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
            <div
              key={item._id}
              className="carausalSlide"
              onClick={() => navigate(`/blog/${item._id}`)}
            >
              <div
                style={{ backgroundImage: `url(${item.image})` }}
                className="carausalData"
              >
                <div className="content">
                  <h1>{item.title}</h1>
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
