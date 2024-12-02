import React from "react";
import styles from "./CourseDetails.module.scss";
import { data } from "../../data/programInfo";
import { SafeHtmlComponent } from "../../components/molecule/Carausal/Carausal";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";

const CourseDetails: React.FC = () => {
  return (
    <section className={styles.courseInfoSection}>
      {data.map((section, idx) => {
        return (
          <div
            key={`section-${idx}`}
            className={styles.courseWrapper}
            style={{ background: section.sectionBackground }}
          >
            <div className={styles.courseContainer}>
              <h3 className={styles.sectionTitle}>Program Overview</h3>
              <p className={styles.section_sub_title}>{section.title}</p>
              <div className={styles.courseCardContainer}>
                {section.cards.map((card, index) => {
                  return (
                    <div
                      key={`card-${idx}${index}`}
                      className={styles.availableCoursesCard}
                    >
                      <div className={styles.cardHeader}>Job Path</div>
                      <div className={styles.content}>
                        <h3 className={styles.cardHeading}>
                          {SafeHtmlComponent(card.cardTitle)}
                        </h3>
                        <p className={styles.cardDesc}>{card.desc}</p>
                        <div className={styles.bulletPointsBox}>
                          {card.bulletPoints.map((point, i) => {
                            return (
                              <p
                                key={`point${i}`}
                                className={styles.bulletPoint}
                              >
                                <span>+ </span>
                                {point}
                              </p>
                            );
                          })}
                        </div>
                        <div className={styles.cardPointsContainer}>
                          {card.highlightedPoints.map((point) => {
                            return (
                              <h4 key={nanoid()} className={styles.cardPoints}>
                                <img src={import.meta.env.VITE_CDN_BASE_URL+point.icon} alt="" />
                                {point.point}
                              </h4>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <NavLink to={section.action} style={{ color: "#000" }}>
                <div className={styles.exploreButton}>
                  <h3>Know More</h3>
                </div>
              </NavLink>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CourseDetails;
