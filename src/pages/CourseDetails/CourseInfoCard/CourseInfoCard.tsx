import React from "react";
import styles from "../CourseDetails.module.scss";
import { nanoid } from "nanoid";
import Lottie from "react-lottie-player";
import awardData from "../../../Lottie/trophiesData.json";
import classNames from "classnames";

export interface CourseInfoCardProps {
  background?: string | null;
  src?: string | null;
  heading?: string | null;
  topics?: string[];
  index: number;
}

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  background = "",
  src = "",
  heading = "",
  topics = [],
  index,
}) => {
  return (
    <div
      className={classNames(styles.card, index === 8 && styles.center)}
      style={{
        background:
          `${background}` || "linear-gradient(320deg, #c078ff 0%, #ffffff 85%)",
      }}
    >
      {index === 8 ? (
          <>
          <Lottie
            animationData={awardData}
            loop
            play
            style={{ width: 280, height: 280 }}
          />
          <h3 className={styles.greets}>Congratulations <img src="/assets/icons/party-popper.svg" alt="party bomb" /></h3>
          </>
      ) : (
        <>
          {src && <img src={src} alt="courses" />}
          <h2>{heading}</h2>
          {topics?.map((topic: string) => (
            <p key={nanoid()}>
              <span>+</span>
              {topic}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default CourseInfoCard;
