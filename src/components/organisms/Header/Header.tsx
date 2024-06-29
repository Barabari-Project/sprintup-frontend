import React, { useEffect, useState } from "react";
import "./style.scss";
import MobileNavbar from "./MobileNavbar";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/assets/logo.svg";
import { useMedia } from "react-use";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const isMobile = useMedia("(max-width: 575px)");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollToCourses && location.pathname === "/") {
      const timer = setTimeout(() => {
        const element = document.getElementById("courses");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setScrollToCourses(false);
      }, 300); // Delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }
  }, [location, scrollToCourses]);

  // const handleCoursesClick = () => {
  //   if (location.pathname === "/") {
  //     const element = document.getElementById("courses");
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   } else {
  //     setScrollToCourses(true);
  //     navigate("/");
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="header">
          <div className={"header_logo"}>
            <MobileNavbar />
            <Link to="/" onClick={scrollToTop} className="logo">
                <img src={logo} alt="" />
                <h2>SprintUp</h2>
            </Link>
          </div>
          <nav className={"header_navigation"}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={scrollToTop}
                >
                  Home
                </NavLink>
              </li>
              <li>
                {/* <a onClick={handleCoursesClick}>Courses</a> */}
                <NavLink to="/course-details" className={({ isActive }) => (isActive ? "active" : "")}>
                  Courses
                </NavLink>
              </li>
              <li>
              <NavLink
                  to="/values"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={scrollToTop}
                >
                  Our Values
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="header-highlight">
        {isMobile ? (
          <>
            <p>Lucknow's top offline MERN full-stack program.</p>
            <p>Hurry, limited seats only! ⏰</p>
          </>
        ) : (
          <p>
            Lucknow's top offline MERN full-stack program. Hurry, limited seats
            only! ⏰
          </p>
        )}
      </div>
      <a href="#" className={scrolled ? "back-to-top visible" : "back-to-top"}>
        <MdOutlineKeyboardDoubleArrowUp />
      </a>
    </>
  );
};

export default Header;
