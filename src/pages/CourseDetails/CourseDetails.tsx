import React from "react";
import styles from "./CourseDetails.module.scss";
import { data } from "../../data/programInfo";
import { SafeHtmlComponent } from "../../components/molecule/Carausal/Carausal";
import { NavLink } from "react-router-dom";

const CourseDetails: React.FC = () => {
  return (
    <section className={styles.courseInfoSection}>
      {data.map((section, idx) => {
        return (
          <div
            key={`section-${idx}`}
            className={styles.courseContainer}
            style={{ background: section.sectionBackground }}
          >
            <h5 className={styles.sectionTitle}>Course Overview</h5>
            <p className={styles.section_sub_title}>{section.title}</p>
            <div className={styles.courseCardContainer}>
              {section.cards.map((card, index) => {
                return (
                  <div key={`card-${idx}${index}`} className={styles.availableCoursesCard}>
                    <div className={styles.cardHeader}>Job Path</div>
                    <div className={styles.content}>
                      <h3 className={styles.cardHeading}>
                        {SafeHtmlComponent(card.cardTitle)}
                      </h3>
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
                        {card.highlightedPoints.map((point) => {
                          return (
                            <h5 className={styles.cardPoints}>
                              <img src={point.icon} alt="" />
                              {point.point}
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
        );
      })}
    </section>
  );
};

export default CourseDetails;
