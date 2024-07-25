import styles from "./Dashboard.module.scss";
import marketingBannerDetails from "../../data/marketingBannerDetails.json";
import React, { useState } from "react";
import Progress from "../../components/atoms/ProgressBar/Progress";
import { Link } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import TalkToUs from "../../components/molecule/TalkToUs/TalkToUs";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import classNames from "classnames";
import TalkToUsModal from "../../components/molecule/TalkToUsModal/TalkToUsModal";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { GrProjects } from "react-icons/gr";
import { TfiBook } from "react-icons/tfi";
import { eventAxiosInstance } from "../../utils/axiosInstance";
import restEndPoints from "../../data/restEndPoints.json";
import { EventType } from "../../types/types";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [talkToUsModalOpen, setTalkToUsModalOpen] = useState<boolean>(false);
  if (!user) {
    return null;
  }
  const onClose = () => {
    setTalkToUsModalOpen(false);
  };

  return (
    <div className={styles.dashboard}>
      {talkToUsModalOpen && (
        <TalkToUsModal
          onClose={onClose}
          message="Help me book a short career counselling session."
          type='Counselling'
        />
      )}
      <SidebarTriggerButton />
      <div
        className={styles.marketingBanner}
        style={{
          backgroundColor: user.enrolled
            ? marketingBannerDetails.enrolled.Subtitle
            : marketingBannerDetails.guest.Subtitle,
        }}
      >
        <div className={styles.content}>
          <h2>
            {user.enrolled
              ? marketingBannerDetails.enrolled.Title
              : marketingBannerDetails.guest.Title}
          </h2>
          <p>
            {user.enrolled
              ? marketingBannerDetails.enrolled.Subtitle
              : marketingBannerDetails.guest.Subtitle}
          </p>
        </div>
        <div className={styles.bannerImage}>
          <img
            src={
              user.enrolled
                ? marketingBannerDetails.enrolled.clipArt
                : marketingBannerDetails.guest.clipArt
            }
            alt="banner"
          />
        </div>
      </div>
      <div className={styles.learningSection}>
        <h2 className={styles.sectionTitle}>
          {user.enrolled
            ? user.progress === 0
              ? "Start Learning"
              : "Keep Learning"
            : "Start Learning"}
        </h2>
        <div className={styles.learningContainer}>
          <Progress progress={user.progress} enrolled={user.enrolled} />
          <div className={styles.learningContent}>
            <h3>Job Path</h3>
            <p> In-Classroom MERN Full-Stack Web Development Course</p>
            <p>
            Learn job-ready skills with real-world projects
            </p>
          </div>
          <div className={styles.learningCtaContainer}>
            <Link to="/course-syllabus">View Syllabus</Link>
            <Link to="/course-syllabus">
              {user.enrolled
                ? user.progress === 0
                  ? "Start Now >>"
                  : "Resume >>"
                : "Start Course >>"}
            </Link>
          </div>
        </div>
      </div>

      {!user.enrolled ? (
        <div className={styles.availableCoursesSection}>
          <h2 className={styles.sectionTitle}>Available Courses</h2>
          <div className={styles.availableCoursesContainer}>
            <div className={styles.availableCoursesCard}>
              <img
                className={styles.cardClipArt}
                src="/assets/dashboard/card1.svg"
                alt=""
              />
              <h2 className={styles.cardHeading}>Not sure where to start?</h2>
              <p className={styles.cardDesc}>
                Connect with us to take a short career counselling session.
              </p>
              <Button
                text="Request a Callback!"
                onClick={() => {
                  setTalkToUsModalOpen(true);
                  eventAxiosInstance.post(`/${restEndPoints.eventAuth}`, { type: EventType.REQUEST_A_CALLBACK_CLICK });
                }}
                className={styles.availableCoursesCardCta}
              />
            </div>
            <div
              className={classNames(styles.availableCoursesCard, styles.detail)}
            >
              <div className={styles.cardHeader}>Job Path</div>
              <div className={styles.content}>
                <h2 className={styles.cardHeading}>MERN Full-Stack Course</h2>
                <p className={styles.cardDesc}>
                  This program offers top-quality tech education by experienced
                  instructors from leading tech companies. We cover key concepts
                  like MongoDB, Express.js, React, and Node.js, equipping you
                  with the skills to excel in the competitive tech industry.
                </p>
                <div className={styles.cardPointsContainer}>
                  <h5 className={styles.cardPoints}><GrProjects /> Includes live projects</h5>
                  <h5 className={styles.cardPoints}><TfiBook /> Open to all disciplines</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.talkToUsSection}>
        <div className={styles.talkToUsContainer}>
          <TalkToUs enrolled={user.enrolled} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
