import React, { useState } from "react";
import "./card.scss";

interface CardProps {
  title: string;
  subtitle: string;
  details: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, details }) => {
  return (
    <div className="page-container">
      <BlogCard title={title} subtitle={subtitle} details={details} />
      <footer>
        Image credit:{" "}
        <a href="https://78.media.tumblr.com/d98fb931adb117c70f0dbced9e947520/tumblr_pe582mbWip1tlgv32o1_1280.png">
          8pxl on Tumblr
        </a>
      </footer>
    </div>
  );
};

interface BlogCardProps {
  title: string;
  subtitle: string;
  details: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, subtitle, details }) => {
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      onClick={flip}
      onMouseEnter={flip}
      onMouseLeave={flip}
      className={`card-container${flipped ? " flipped" : ""}`}
    >
      <Front title={title} subtitle={subtitle} />
      <Back details={details} />
    </div>
  );
};

interface FrontProps {
  title: string;
  subtitle: string;
}

const Front: React.FC<FrontProps> = ({ title, subtitle }) => {
  return (
    <div className="front">
      <ImageArea title={title} subtitle={subtitle} />
      {/* <MainArea /> */}
    </div>
  );
};

interface BackProps {
  details: string;
}

const Back: React.FC<BackProps> = ({ details }) => {
  return (
    <div className="back">
      <p>{details}</p>
    </div>
  );
};

interface ImageAreaProps {
  title: string;
  subtitle: string;
}

const ImageArea: React.FC<ImageAreaProps> = ({ title, subtitle }) => {
  return (
    <div className="image-container" style={{ background: "#facb41" }}>
      <img
        className="card-image"
        src="https://assets-global.website-files.com/63e7894221f7cc20e07be64b/63e90055037f3b91a0d36069_Group%2014582335.svg"
        alt="Blog post"
      />
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
    </div>
  );
};

export default Card;
