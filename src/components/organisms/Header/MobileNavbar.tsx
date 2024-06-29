import React, { useEffect, useState } from "react";
import "./style.scss";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const MobileNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();

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
  //   closeMenu();
  // };

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
    <AnimatePresence>
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
            <motion.li initial={{ x: -100 }} animate={{ x: 0 }}>
              <NavLink
                onClick={scrollToTop}
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </motion.li>
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
                Our Values
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
        </nav>
      </div>
    </AnimatePresence>
  );
};

export default MobileNavbar;
