import React from "react";
import { SlideData } from "../../organisms/Hero/Hero";
import { nanoid } from "nanoid";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

export function SafeHtmlComponent(htmlContent: string, FORBID_TAGS: string[] = []) {
  // Sanitize the HTML content, allowing only specific tags
  const cleanHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ["strong", "i", "br", "pre", "code", "span", "b"],
    FORBID_TAGS: ["script", ...FORBID_TAGS],
  });
  return parse(cleanHtml);
}

export interface CarausalProps {
  data: SlideData[];
}
const Carausal: React.FC<CarausalProps> = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className="hero_carausal">
      <Slider {...settings}>
        {data.map((slide) => {
          if (slide?.type === "profile") {
            return (
              <div key={nanoid()} className={"carausalSlide"}>
                <div className={"aspirantsDescription"}>
                  <h2>{slide.title}</h2>
                  <ul className={"profile_list"}>
                    {slide?.profiles?.map((profile) => {
                      return <li key={nanoid()}>
                        <img src={profile.image} alt={profile.name} />
                        <div className="profile_desc">
                          <p>{profile.desc}</p>
                          <h3>{profile.name}</h3>
                          <h3>{profile.location}</h3>
                        </div>
                      </li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          } else {
            const sanitizedHtml = SafeHtmlComponent(slide.title as string);
            return (
              <div key={nanoid()} className={"carausalSlide"}>
                <img className="background" src={slide.image} alt="slide image" />
                <div className={"slideDescription"}>
                  <h2>{sanitizedHtml}</h2>
                  <ul className={"desc_list"}>
                    {slide?.desc?.map((text) => {
                      return (
                        <li key={nanoid()}>
                          <span>+</span>
                          <p>{text}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default Carausal;
