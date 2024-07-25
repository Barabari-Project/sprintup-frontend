import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CourseSyllabus.module.scss";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import restEndPoints from "../../data/restEndPoints.json";
import axiosInstance, { eventAxiosInstance } from "../../utils/axiosInstance";
import { EventType } from "../../types/types";
import { FaGraduationCap } from "react-icons/fa6";
import { MdFlightClass, MdOutlineLock } from "react-icons/md";
import { SiInternetarchive, SiGoogleclassroom } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { GiFaceToFace } from "react-icons/gi";
import { nanoid } from "nanoid";
import { MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import loaderData from "../../Lottie/loaderSmall.json"

type SubTopic = {
  name: string;
  description: string;
  isLocked: boolean;
};

type Topic = {
  name: string;
  id: number | string;
  description: string;
  subtopics: SubTopic[];
};

type Course = {
  name: string;
  topics: Topic[];
};

const CourseSyllabus: React.FC = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    eventAxiosInstance.post(`/${restEndPoints.eventAuth}`, {
      type: EventType.COURSE_SYLLABUS_VIEW,
    });
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/${restEndPoints.course}`);
      setCourseData(response.data.modules);
    } catch (err: any) {
      toast.error(err.response.data.error);
      if (401 == err.response.status) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.courseSyllabus}>
      <SidebarTriggerButton />
      <div className={styles.pageDetails}>
        <h5 className={styles.subject}>Job Path</h5>
        <h2 className={styles.title}>
          In-Classroom MERN Full-Stack Web Development Course
        </h2>
        <h3 className={styles.subTitle}>
          Enroll today to kickstart your tech career
        </h3>
        <p className={styles.desc}>
          Unlock your potential with our flagship course, specifically designed
          for students of all disciplines. This program offers top-quality tech
          education by experienced instructors from leading tech companies. We
          cover the latest in MongoDB, Express.js, React, and Node.js, equipping
          you with the skills to excel in the competitive tech industry. Upon
          completing the course, we guarantee a 100% job placement. Join us to
          transform your future and become a proficient full-stack developer.
        </p>

        <div className={styles.highlightedPoints}>
          <div className={styles.highlightedPoint}>
            <p className={styles.point}>
              <FaGraduationCap /> 100% Job guarantee on course completion
            </p>
            <p className={styles.point}>
              <MdFlightClass /> In-class lecture & doubt clearance
            </p>
          </div>
          <div className={styles.highlightedPoint}>
            <p className={styles.point}>
              <SiInternetarchive /> Guaranteed 2-month internship
            </p>
            <p className={styles.point}>
              <GrProjects /> 4+ real-world projects
            </p>
          </div>
          <div className={styles.highlightedPoint}>
            <p className={styles.point}>
              <GiFaceToFace /> 1:1 continuous support
            </p>
            <p className={styles.point}>
              <SiGoogleclassroom /> Open for all disciplines
            </p>
          </div>
        </div>
      </div>
      <div className={styles.syllabusSection}>
        <h3 className={styles.sectionTitle}>Course Syllabus</h3>
        {isLoading ? (
          <div className={styles.loader}>
            <Lottie
              animationData={loaderData}
              play
              style={{ width: 300, height: 300 }}
            />
          </div>
        ) : courseData.length > 0 ? (
          courseData.map((module) => (
            <div className={styles.moduleContainer} key={nanoid()}>
              <h2 className={styles.moduleTitle}>
                {module.name}
              </h2>
              {module.topics.length > 0 ? (
                module.topics.map((topic) => (
                  <LessonItem key={nanoid()} topic={topic} />
                ))
              ) : (
                <p>No lessons available.</p>
              )}
            </div>
          ))
        ) : (
          <p>No modules available.</p>
        )}
      </div>
    </div>
  );
};

const LessonItem: React.FC<{ topic: Topic }> = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLesson = () => {
    setIsExpanded((prev) => !prev);
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
              {topic.subtopics.map((subTopic) => (
                <div className={styles.topic} key={nanoid()}>
                  <div className={styles.topicIcon}>
                    <MdOutlineLock />
                  </div>
                  <div className={styles.topicContent}>
                    <h5>{subTopic.name}</h5>
                    <p>{subTopic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseSyllabus;
