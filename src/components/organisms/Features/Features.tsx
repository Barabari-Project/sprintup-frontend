import React from "react";
import styles from "./style.module.scss";
import FeaturesCarausal from "../../molecule/FeaturesCarausal/FeaturesCarausal";
import { useMedia } from "react-use";
import { NavLink } from "react-router-dom";

const Features: React.FC = () => {
  const isTablet = useMedia("(max-width: 1145px)");
  return (
    <section className={styles.featureSection}>
      <div className={styles.featuresContainer}>
        <h1 className={styles.sectionHeading}>Why choose us?</h1>
        <h2 className={styles.sectionTitle}>
          Our Program Maximises
          {!isTablet ? (
            <span> Real-World Learning</span>
          ) : (
            <>
              <br />
              <span>Real-World Learning</span>
            </>
          )}
        </h2>

        <FeaturesCarausal />
        <NavLink to="/course-details" style={{ color: "#000" }}>
          <div
            className={styles.exploreButton}
          >
            <h3>Know More</h3>
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default Features;
