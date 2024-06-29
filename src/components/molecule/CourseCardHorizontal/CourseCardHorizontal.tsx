import React from "react";
import styles from "./style.module.scss";
import { Course } from "../../../types/types";
// import { IoIosPeople } from "react-icons/io";
// import { MdAccessTime } from "react-icons/md";
// import { FaGraduationCap } from "react-icons/fa6";
// import { FaSuitcase } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { MdKeyboardArrowRight } from "react-icons/md";
import developerImg from '../../../assets/images/developer.png';
import { CiTimer } from "react-icons/ci";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { LuBadgeInfo } from "react-icons/lu";

const CourseCardHorizontal: React.FC<Course> = ({
  title,
  // duration,
  // seatsLeft,
  // description,
  curriculum,
  placement,
  // brochureLink,
  // learnMoreLink,
  catagory,
}) => {
  const courseDetails = [
    { icon: <CiTimer size={20} color={'green'}/>, key: 'Duration', value: '8 months' },
    { icon: <IoCloudOfflineOutline size={20} color={'green'}/>, key: 'Features', value: 'In-class doubt sessions' },
    { icon: <MdSupportAgent size={20} color={'green'}/>, key: 'Support', value: '1:1 mentor support' },
    { icon: <FaHandsHelping size={20} color={'green'}/>, key: 'Partners', value: '15+ Companies' },
    { icon: <LuBadgeInfo size={20} color={'green'}/>, key: 'Outcome', value: '100% Job assistance' },
  ];
  return (
    <div className={styles.courseCardHorizontal}>
      <div className={styles.courseCardWrapper}>
      <div className={styles.titleBox}>
      <div className={styles.cardCatagory}>{catagory}</div>
        <img src={developerImg} alt="" />
        <h2 className={styles.cardTitle}>{title}</h2>
        {/* <div className={styles.courseInfo}>
          <h5>
            <MdAccessTime/>
            Duration: <span>{duration}</span>
          </h5>
          <h5>
          <IoIosPeople />
            Seats Left: <span>{seatsLeft}</span>
          </h5>
        </div> */}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.curriculum}>
          <h3> CURRICULUM</h3>
          <ul>
            {curriculum.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <hr />
        <div className={styles.placement}>
          <h3> PLACEMENT</h3>
          <ul>
            {placement.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        {/* <div className={styles.cardButtons}>
          <a href={brochureLink || "#"}>Brochure <MdOutlineFileDownload /></a>
          <a href={learnMoreLink || "#"}>Learn More <MdKeyboardArrowRight /></a>
        </div> */}

      </div>
      </div>
      <div className={styles.features}>
        {
          courseDetails.map((item) => {
            return(
              <div className={styles.feature_comp}>
                <div className={styles.icons}>{item.icon}</div>
                <div className={styles.content}>
                  <p className={styles.heading}>{item.key}</p>
                  <p className={styles.body}>{item.value}</p>
                </div>
              </div>
              
            )
          })
        }
        
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
