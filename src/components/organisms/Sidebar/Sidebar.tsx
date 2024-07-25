import styles from "./Sidebar.module.scss";
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import React from "react";
import TalkToUs from "../../molecule/TalkToUs/TalkToUs";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  if (!user) {
    return null;
  }
  return (
    <div className={styles.sidebar}>
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
            to="/course-syllabus"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <GoTasklist />
            Course Syllabus
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
      <TalkToUs enrolled={user.enrolled} />
    </div>
  );
};

export default Sidebar;
