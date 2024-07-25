import React, { useEffect, useState } from "react";
import "./style.scss";
import MobileNavbar from "./MobileNavbar";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/assets/logo.svg";
import { useMedia } from "react-use";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ProfilePopover from "../../molecule/ProfilePopover/ProfilePopover";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="header">
          {isMobile ? <MobileNavbar /> : null}
          <div className={"header_logo"}>
            {!isMobile ? <MobileNavbar /> : null}
            <Link to="/" state={{ isForceFull: true }} onClick={scrollToTop} className="logo">
              <img src={logo} alt="" />
              <h2>SprintUp</h2>
            </Link>
          </div>
          <nav className={"header_navigation"}>
            <ul>
              <li>
                <NavLink
                  to={user ? "/dashboard" : "/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={scrollToTop}
                >
                  {user ? "My Home" : "Home"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/course-details"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/values"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={scrollToTop}
                >
                  About Us
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
          {!user ? (
            <div className="header_btns">
              <Link to="/login" className="header_btn login">
                Log In
              </Link>
              {!isMobile ? (
                <Link to="/signup" className="header_btn signup">
                  Sign Up
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="header_btns">
              <ProfilePopover />
            </div>
          )}
        </div>
      </header >
      <div onClick={scrollToTop}  className={scrolled ? "back-to-top visible" : "back-to-top"}>
        <MdOutlineKeyboardDoubleArrowUp />
      </div>
    </>
  );
};

export default Header;
