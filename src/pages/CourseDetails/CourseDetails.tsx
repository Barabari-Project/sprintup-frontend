import React from "react";
import styles from "./CourseDetails.module.scss";
import ScrollComponent from "./ScrollComponent/ScrollComponent";
import MobileView from "./MobileView/MobileView";
import { useMedia } from "react-use";

const CourseDetails: React.FC = () => {
  const isSmallScreen = useMedia("(max-width: 1023px)");
  return (
    <section className={styles.courseInfoSection}>
      <div className={styles.courseContainer}>
        <h5 className={styles.sectionTitle}>Course Overview</h5>
        <p className={styles.section_sub_title}>
          <span>In-Classroom </span>
           Full-Stack Web Development Program
        </p>
        {isSmallScreen ? <MobileView /> : <ScrollComponent />}
      </div>
    </section>
  );
};

export default CourseDetails;
