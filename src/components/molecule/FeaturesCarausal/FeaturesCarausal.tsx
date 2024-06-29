import React, { useState } from "react";
import { WhyChooseUsCardDetails } from "../../../types/types";
import FeaturesCard from "../FeaturesCard/FeaturesCard";
import WhyChooseUsListData from "../../../data/whyChooseUsInfo.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

const FeaturesCarausal: React.FC = () => {
  const [flipedCard, setFlipedCard] = useState<string>('');

  return (
    <div className="features">
      {WhyChooseUsListData.map((whyChooseUs: WhyChooseUsCardDetails) => (
        <FeaturesCard cardDetails={whyChooseUs} flipedCard={flipedCard} setFlipedCard={setFlipedCard} key={whyChooseUs.id} />
      ))}
    </div>
  );
};

export default FeaturesCarausal;
