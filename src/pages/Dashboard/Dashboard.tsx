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
import { eventAxiosInstance } from "../../utils/axiosInstance";
import restEndPoints from "../../data/restEndPoints.json";
import { EventType } from "../../types/types";
import { availableCourseData } from "../../data/dashboardAvailableCoursesData";
import Slider from "react-slick";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [talkToUsModalOpen, setTalkToUsModalOpen] = useState<boolean>(false);

  if (!user) {
    return null;
  }

  const onClose = () => {
    setTalkToUsModalOpen(false);
  };

  // Settings for React Slick slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      {talkToUsModalOpen && (
        <TalkToUsModal
          onClose={onClose}
          message="Help me book a short career counselling session."
          type="Counselling"
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
                ?import.meta.env.VITE_CDN_BASE_URL+ marketingBannerDetails.enrolled.clipArt
                : import.meta.env.VITE_CDN_BASE_URL+marketingBannerDetails.guest.clipArt
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
          <Progress progress={user.progress} enrolled={0 != user.progress} />
          <div className={styles.learningContent}>
            <h3>Job Path</h3>
            <p>In-Classroom MERN Full-Stack Web Development Course</p>
            <p>Learn job-ready skills with real-world projects</p>
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
            <Slider {...sliderSettings}>
              {availableCourseData.map((course, idx) => (
                <div
                  key={`course_${idx}`}
                  className={classNames(
                    styles.availableCoursesCard,
                    styles.detail
                  )}
                >
                  <div className={styles.cardHeader}>Job Path</div>
                  <div className={styles.content}>
                    <h2 className={styles.cardHeading}>{course.courseName}</h2>
                    <p className={styles.cardDesc}>{course.courseDesc}</p>
                    <div className={styles.cardPointsContainer}>
                      {course.coursePoints.map((point, index) => (
                        <h4
                          key={`coursePoint_${index}`}
                          className={styles.cardPoints}
                        >
                          <img src={import.meta.env.VITE_CDN_BASE_URL+point.icon} alt="icon" /> {point.point}
                        </h4>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

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
                    eventAxiosInstance.post(`/${restEndPoints.eventAuth}`, {
                      type: EventType.NOT_SURE_CLICK,
                    });
                  }}
                  className={styles.availableCoursesCardCta}
                />
              </div>
            </Slider>
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
