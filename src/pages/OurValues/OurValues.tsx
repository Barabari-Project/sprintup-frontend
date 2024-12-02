import { nanoid } from "nanoid";
import ourValuesCardList from "../../data/ourValuesDetails.json";
import { OurValuesCardDetails } from "../../types/types";
import styles from "./styles.module.scss";
import { Helmet } from "react-helmet";

const OurValues: React.FC = () => {
  return (
    <section className={styles.ourValuesPage}>
      <Helmet>
        <title>SprintUp Job-Ready Courses - Data Science, Full Stack Web Development & Digital Marketing in Lucknow</title>
        <meta
          name="description"
          content="Explore SprintUp's job-ready courses, including Data Science, Full Stack Web Development, and Digital Marketing. Learn from industry experts with 100% job placement support."
        />
        <meta
          name="keywords"
          content="Data Science, Analytics, Full Stack Development, Digital Marketing, Jobs, Training, Upskilling, Tech, Lucknow"
        />
      </Helmet>

      <div className={styles.ourValues}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>our mission</h2>
          <p className={styles.section_sub_title}>
            At SprintUp, we aim to bridge the skill gap and foster all-round
            growth for Bharat's emerging talent.
          </p>
        </div>
        <h2 className={styles.title}>Our Values</h2>
        <div className={styles.ourValuesCardContainer}>
          {ourValuesCardList.map((cardDetail: OurValuesCardDetails) => (
            <div key={nanoid()} className={styles.ourValuesCard}>
              {cardDetail.image ? (
                <img
                  className={styles.cardImage}
                  src={import.meta.env.VITE_CDN_BASE_URL+cardDetail.image}
                  alt="image"
                />
              ) : null}
              <h4>{cardDetail.title}</h4>
              <p>{cardDetail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
