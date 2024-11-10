import React, { useEffect, useState } from "react";
import "./style.scss";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const MobileNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);

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
    closeMenu();
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`mobile-navbar ${menuOpen ? "open" : ""}`}>
      <div className="hamburgerIcon" onClick={toggleMenu}>
        {menuOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </div>
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
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
              onClick={scrollToTop}
              to="/course-details"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={scrollToTop}
              to="/values"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        {user && (
          <div className="header_btns">
            <Link to="/login" className="header_btn login  mobile">
              Log In
            </Link>
            <Link to="/signup" className="header_btn signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNavbar;
