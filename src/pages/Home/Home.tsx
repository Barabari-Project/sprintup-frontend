import React from "react";
import "./style.scss";
import Hero from "../../components/organisms/Hero/Hero";
import Courses from "../../components/organisms/Courses/Courses";
import Features from "../../components/organisms/Features/Features";
import AboutUs from "../../components/organisms/AboutUs/AboutUs";
import BookLiveClassForm from "../../components/organisms/BookLiveClass/BookLiveClass";
import { BsWhatsapp } from "react-icons/bs";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
      <Courses />
      <Features />
      <AboutUs />
      <BookLiveClassForm />
      <a
        className="whatsapp-icon"
        href="https://wa.me/9033107408
"
        target="_blank"
      >
        <BsWhatsapp />
      </a>
    </div>
  );
};

export default Home;
