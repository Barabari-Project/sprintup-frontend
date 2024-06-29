import { nanoid } from "nanoid";
import ourValuesCardList from "../../data/ourValuesDetails.json";
import { OurValuesCardDetails } from "../../types/types";
import styles from "./styles.module.scss";

const OurValues: React.FC = () => {
  return (
    <section className={styles.ourValuesPage}>
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
                  src={cardDetail.image}
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
