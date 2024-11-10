import React from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";
import cardDetails from "../../../data/courseInfo.json";
import { FaRegHandshake } from "react-icons/fa6";
import { SafeHtmlComponent } from "../../molecule/Carausal/Carausal";

const Courses: React.FC = () => {
  return (
    <>
      <section className={styles.courcesSection} id="courses">
        <div className={styles.courcesContainer}>
          <h5 className={styles.sectionTitle}>Our Courses</h5>
          <p className={styles.section_sub_title}>
            <span>Job-linked </span>
            Upskilling Courses
          </p>
          <div className={styles.courseCardContainer}>
            {cardDetails.map((card, idx) => {
              return (
                <div key={idx} className={styles.availableCoursesCard}>
                  <div className={styles.cardHeader}>Job Path</div>
                  <div className={styles.content}>
                    <h3 className={styles.cardHeading}>{SafeHtmlComponent(card.title)}</h3>
                    <p className={styles.cardDesc}>{card.desc}</p>
                    <div className={styles.bulletPointsBox}>
                      {card.bulletPoints.map((point, i) => {
                        return (
                          <p key={`${idx}bullet--${i}`} className={styles.bulletPoint}>
                            <span>+ </span>
                            {point}
                          </p>
                        );
                      })}
                    </div>
                    <div className={styles.cardPointsContainer}>
                      {card.bottomPoints.map((point, i) => {
                        return (
                          <h5 key={`${idx}bottom--${i}`} className={styles.cardPoints}>
                            {i === 0 ? <TfiBook /> : <FaRegHandshake />}{" "}
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
              <h2 className={styles.title}>Top Expert</h2>
              <h4 className={styles.subTitle}>Instructors</h4>
            </div>

            <div className={styles.courseHighlights__point}>
              <h2 className={styles.title}>15+ Companies</h2>
              <h4 className={styles.subTitle}>Partners </h4>
            </div>
            <div className={styles.courseHighlights__point}>
              <h2 className={styles.title}>100% Placement</h2>
              <h4 className={styles.subTitle}>Assistance</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
