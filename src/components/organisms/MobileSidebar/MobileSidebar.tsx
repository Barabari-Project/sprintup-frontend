import React from "react";
import styles from "./MobileSidebar.module.scss";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export interface MobileSidebarProps {
  isOpen: boolean;
  close: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, close }) => {
  return (
    <div className={`${styles.mobileSidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.overlay} onClick={close}></div>
      <div className={styles.sidebarContent}>
        <button className={styles.closeButton} onClick={close}>
          &times;
        </button>
        <div className={styles.sidebar}>
          <div className={styles.sidebar_logo}>
            <Link to="" className={styles.logo}>
              <img src="/assets/logo.svg" alt="" />
              <h2>SprintUp</h2>
            </Link>
          </div>
          <ul className={styles.navigations}>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <MdOutlineDashboard />
                My Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/course-syllabus/data-analytics"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <GoTasklist />
                Data Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/course-syllabus/mern-full-stack"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <GoTasklist />
                MERN Full Stack
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/course-syllabus/digital-marketing"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <GoTasklist />
                Digital Marketing
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className={styles.disable}
                onClick={(e) => e.preventDefault()}
              >
                <RiGitRepositoryLine />
                Lecture Repository
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
