import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Hero from "../../components/organisms/Hero/Hero";
import Courses from "../../components/organisms/Courses/Courses";
import Features from "../../components/organisms/Features/Features";
import AboutUs from "../../components/organisms/AboutUs/AboutUs";
import BookLiveClassForm from "../../components/organisms/BookLiveClass/BookLiveClass";
import { BsWhatsapp } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import RequestCallModal from "../../components/molecule/RequestCallModal/RequestCallModal";
import { useMedia } from "react-use";
import {Helmet} from 'react-helmet';

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [requestModal, setRequestModal] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 575px)");
  const location = useLocation();
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.removeItem("userClosedModal");

    const handleScroll = () => {
      const userClosedModal = sessionStorage.getItem("userClosedModal");
      if (featuresRef.current && !userClosedModal) {
        const aboutUsTop = featuresRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (isMobile && aboutUsTop <= windowHeight) {
          setRequestModal(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const onClose = () => {
    setRequestModal(false);
    sessionStorage.setItem("userClosedModal", "true");
  };

  if (!location.state && user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <div className="home">
      <Helmet>
        <title>SprintUp - Affordable Data Science, Full Stack Web Development, and Digital Marketing Courses in Lucknow | 100% Job Placement Assistance</title>
        <meta
          name="description"
          content="Join SprintUp's affordable job-ready upskilling programs in Lucknow, featuring Data Science, Digital Marketing, and Full Stack Web Development with top MNC instructors and 100% job placement assistance."
        />
        <meta
          name="keywords"
          content="Data Science, Full Stack Development, Digital Marketing, Affordable Courses, Placement Assistance, Jobs, Training, Lucknow"
        />
      </Helmet>

      {requestModal && <RequestCallModal onClose={onClose} />}
      <Hero />
      <Courses />
      <div ref={featuresRef}>
        <Features />
      </div>
      <AboutUs />
      <BookLiveClassForm />
      <a
        className="whatsapp-icon"
        href="https://wa.me/9560939327"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <BsWhatsapp />
      </a>
    </div>
  );
};

export default Home;
