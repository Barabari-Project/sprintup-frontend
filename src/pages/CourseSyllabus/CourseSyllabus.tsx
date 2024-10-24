import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CourseSyllabus.module.scss";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import restEndPoints from "../../data/restEndPoints.json";
import axiosInstance, { eventAxiosInstance } from "../../utils/axiosInstance";
import { EventType } from "../../types/types";
import { FaGraduationCap } from "react-icons/fa6";
import { MdFlightClass, MdOutlineCheck, MdOutlineLock } from "react-icons/md";
import { SiInternetarchive, SiGoogleclassroom } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { GiFaceToFace } from "react-icons/gi";
import { nanoid } from "nanoid";
import { MdExpandMore } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import loaderData from "../../Lottie/loaderSmall.json";
import { setUserDetails } from "../../redux/slices/UserSliice";
import { useDispatch } from "react-redux";
import classNames from "classnames";

type SubTopic = {
  name: string;
  description: string;
  isLocked: boolean;
  link?: string;
};

type Topic = {
  name: string;
  id: number | string;
  description: string;
  subtopics: SubTopic[];
};

type Module = {
  name: string;
  topics: Topic[];
};

type CourseDetails = {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  modules: Module[];
};

const CourseSyllabus: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseDetails | null>(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    eventAxiosInstance.post(`/${restEndPoints.eventAuth}`, {
      type: EventType.COURSE_SYLLABUS_VIEW,
    });
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    setLoading(true);
    const endPoint =
      id === "mern-full-stack"
        ? "mernStack"
        : id === "data-analytics"
        ? "dataAnalytics"
        : "digitalMarketing";

    try {
      const response = await axiosInstance.get(`/${restEndPoints[endPoint]}`);
      setCourseData(response.data);
    } catch (err: any) {
      toast.error(err.response.data.error);
      if (401 == err.response.status) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FaGraduationCap />;
      case 1:
        return <MdFlightClass />;
      case 2:
        return <SiInternetarchive />;
      case 3:
        return <GrProjects />;
      case 4:
        return <GiFaceToFace />;
      case 5:
        return <SiGoogleclassroom />;
      default:
        return null;
    }
  };

  const groupPointsInPairs = (points: string[]) => {
    const pairs = [];
    for (let i = 0; i < points.length; i += 2) {
      pairs.push(points.slice(i, i + 2));
    }
    return pairs;
  };

  return isLoading ? (
    <div className={classNames(styles.courseSyllabus, styles.loader)}>
      <Lottie
        animationData={loaderData}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  ) : courseData ? (
    <div className={styles.courseSyllabus}>
      <SidebarTriggerButton />
      <div className={styles.pageDetails}>
        <h5 className={styles.subject}>Job Path</h5>
        <h2 className={styles.title}>{courseData.title}</h2>
        <h3 className={styles.subTitle}>{courseData.subtitle}</h3>
        <p className={styles.desc}>{courseData.description}</p>
        <div className={styles.highlightedPoints}>
          {courseData.points.length > 0 ? (
            groupPointsInPairs(courseData.points).map((pair, pairIndex) => (
              <div key={pairIndex} className={styles.highlightedPoint}>
                {pair.map((point, index) => (
                  <p key={index} className={styles.point}>
                    {getIcon(pairIndex * 2 + index)} {point}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className={styles.failedText}>No lessons available.</p>
          )}
        </div>
      </div>
      <div className={styles.syllabusSection}>
        <h3 className={styles.sectionTitle}>Course Syllabus</h3>
        {courseData.modules.length > 0 ? (
          courseData.modules.map((module) => (
            <div className={styles.moduleContainer} key={nanoid()}>
              <h2 className={styles.moduleTitle}>{module.name}</h2>
              {module.topics.length > 0 ? (
                module.topics.map((topic) => (
                  <LessonItem
                    key={nanoid()}
                    modueName={module.name}
                    topic={topic}
                  />
                ))
              ) : (
                <p className={styles.failedText}>No lessons available.</p>
              )}
            </div>
          ))
        ) : (
          <p className={styles.failedText}>No modules available.</p>
        )}
      </div>
    </div>
  ) : (
    <p className={styles.failedText}>No Data available.</p>
  );
};

const LessonItem: React.FC<{ modueName: string; topic: Topic }> = ({
  modueName,
  topic,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const toggleLesson = () => {
    setIsExpanded((prev) => !prev);
  };

  const triggerEvent = (modueName: string) => {
    const type = modueName.split(":")[0] + "_" + EventType.LOCK_CLICK;
    eventAxiosInstance.post(`/${restEndPoints.eventAuth}`, {
      type: type,
    });
  };

  const increaseProgress = async () => {
    try {
      const response = await axiosInstance.post(
        `/${restEndPoints.increaseProgress}`
      );

      const studentDetails = response.data.student;
      dispatch(
        setUserDetails({
          enrolled: studentDetails.isEnrolled,
          phoneNumber: studentDetails.phoneNumber,
          name: studentDetails.name,
          progress: studentDetails.enrolled
            ? studentDetails.enrolled.progress
            : 0,
          avatar: studentDetails.avatar,
        })
      );
    } catch (error) {}
  };

  return (
    <div className={styles.lessonContainer}>
      <h3
        className={`${styles.lessonTitle} ${isExpanded ? styles.expanded : ""}`}
        onClick={toggleLesson}
      >
        {topic.name}
        <span className={styles.expandIcon}>
          <MdExpandMore />
        </span>
      </h3>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.content}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={styles.lessonDescription}>{topic.description}</p>
            <div className={styles.topicsContainer}>
              {topic.subtopics.map((subTopic) =>
                subTopic.link ? (
                  <a
                    href={subTopic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.topicLink}
                  >
                    <div
                      className={styles.topic}
                      key={nanoid()}
                      onClick={() => {
                        triggerEvent(modueName);
                        increaseProgress();
                      }}
                    >
                      <div className={styles.topicIcon}>
                        {subTopic.isLocked ? (
                          <MdOutlineLock />
                        ) : (
                          <MdOutlineCheck />
                        )}
                      </div>
                      <div className={styles.topicContent}>
                        <h5>{subTopic.name}</h5>
                        <p>{subTopic.description}</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    className={styles.topic}
                    key={nanoid()}
                    onClick={() => triggerEvent(modueName)}
                  >
                    <div className={styles.topicIcon}>
                      {subTopic.isLocked ? (
                        <MdOutlineLock />
                      ) : (
                        <MdOutlineCheck />
                      )}
                    </div>
                    <div className={styles.topicContent}>
                      <h5>{subTopic.name}</h5>
                      <p>{subTopic.description}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseSyllabus;
