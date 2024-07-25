import React from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";
import cardDetails from "../../../data/courseInfo.json";
import { FaRegHandshake } from "react-icons/fa6";

const Courses: React.FC = () => {
  return (
    <>
      <section className={styles.courcesSection} id="courses">
        <div className={styles.courcesContainer}>
          <h5 className={styles.sectionTitle}>Course Overview</h5>
          <p className={styles.section_sub_title}>
            <span>In-Classroom </span>
            MERN Full-Stack Web Development Course
          </p>
          <div className={styles.courseCardContainer}>
            {cardDetails.map((card, idx) => {
              return (
                <div className={styles.availableCoursesCard}>
                  <div className={styles.cardHeader}>Job Path</div>
                  <div className={styles.content}>
                    <h2 className={styles.cardHeading}>{card.title}</h2>
                    <p className={styles.cardDesc}>{card.desc}</p>
                    <div className={styles.bulletPointsBox}>
                      {card.bulletPoints.map((point) => {
                        return (
                          <p className={styles.bulletPoint}>
                            <span>+ </span>
                            {point}
                          </p>
                        );
                      })}
                    </div>
                    <div className={styles.cardPointsContainer}>
                      {card.bottomPoints.map((point) => {
                        return (
                          <h5 className={styles.cardPoints}>
                            {idx === 0 ? <TfiBook /> : <FaRegHandshake />}{" "}
                            {point}
                          </h5>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <NavLink to="/course-details" style={{ color: "#000" }}>
            <div className={styles.exploreButton}>
              <h3>Know More</h3>
            </div>
          </NavLink>
        </div>
      </section>
      <section className={styles.courseHighlights__container}>
        <div className={styles.courseHighlights}>
          <h1 className={styles.courseHighlights__tagLine}>
            {/* Build Your Tech Career With Us */}
            We'll Find The Right Job For You
          </h1>
          <div className={styles.courseHighlights__points}>
            <div className={styles.courseHighlights__point}>
              <h2 className={styles.title}>7 Months</h2>
              <h4 className={styles.subTitle}>Duration</h4>
            </div>

            <div className={styles.courseHighlights__point}>
              <h2 className={styles.title}>15+ Companies</h2>
              <h4 className={styles.subTitle}>Partners </h4>
            </div>
            <div className={styles.courseHighlights__point}>
              <h2 className={styles.title}>100% Placement</h2>
              <h4 className={styles.subTitle}>Guarantee</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
