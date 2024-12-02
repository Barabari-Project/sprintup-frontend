import React from "react";
import styles from "./AboutUs.module.scss";
import instructorListData from "../../../data/teamInfo.json";
import { Instructor } from "../../../types/types";
// import linkedInIcon from "/assets/icons/linkedIn.svg";
// import instagramIcon from "/assets/icons/instagram.svg";
import { nanoid } from "nanoid";
const AboutUs: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutUs}>
        <h1 className={styles.sectionTitle}>Our Team</h1>
        <p className={styles.sectionDesc}>Fueled with passion for learning</p>
        <hr />
        <div className={styles.profileContainer}>
          {instructorListData.map((personInfo: Instructor) => (
            <div className={styles.profile} key={nanoid()}>
              <div className={styles.profile__imageContainer}>
                {/* <img src={personInfo.profilePicture} alt="Profile Picture" /> */}
                <img src={import.meta.env.VITE_CDN_BASE_URL+personInfo.profilePicture} alt="" />
              </div>
              <h2 className={styles.profile__name}>{personInfo.name}</h2>
              <p className={styles.profile__designation}>
                {personInfo.designation}
              </p>
              <p className={styles.profile__college}>{personInfo.college}</p>
              <div className={styles.socialMedia}>
                <a href={personInfo.linkedin || "#"} target="_blank">
                  {/* <FaLinkedin /> */}
                  <img src={import.meta.env.VITE_CDN_BASE_URL+"/icons/linkedIn.svg"} width={'30px'} height={'30px'} alt="LinkedIn" />
                </a>
                <a href={personInfo.instagram || "#"} target="_blank">
                  {/* <AiFillInstagram /> */}
                  <img src={import.meta.env.VITE_CDN_BASE_URL+"/icons/instagram.svg"} width={'30px'} height={'30px'} alt="Instagram" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
