import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Textarea from "../../components/atoms/TextArea/TextArea";
import contactDetails from "../.../../../data/contactDetails.json";
import { toast } from "react-toastify";
import restEndPoints from "../../data/restEndPoints.json";
import { validateMessage, validateName, validatePhoneNumber } from "../../utils/validations";
import axiosInstance from "../../utils/axiosInstance";
import { Helmet } from "react-helmet";
import LoaderOverlay from "../../components/molecule/LoaderOverlay/LoaderOverlay";

const ContactUs: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [messageTextError, setMessageTextError] = useState<string | null>(null);

  const contactData = [
    {
      title: "Phone",
      value: contactDetails.phone,
      icon: <FiPhoneCall />,
      link: `tel:${contactDetails.phone}`
    },
    {
      title: "Secondary",
      value: contactDetails.secondary,
      icon: <FiPhoneCall />,
      link: `tel:${contactDetails.secondary}`
    },
    {
      title: "Email",
      value: contactDetails.email,
      icon: <MdOutlineEmail />,
      link: `mailto:${contactDetails.email}`
    },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(inputName);
    const numberError = validatePhoneNumber(inputNumber);
    const messageTextError = validateMessage(messageText);
    setNameError(nameError);
    setNumberError(numberError);
    setMessageTextError(messageTextError);

    if (nameError || numberError || messageTextError) {
      return;
    }
    setLoading(true);
    const data = {
      name: inputName,
      phoneNumber: inputNumber
    };

    try {
      const response = await axiosInstance.post(`/${restEndPoints.requestACall}`, data);
      setFormSubmitted(true);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Contact SprintUp - Get in Touch for Affordable Job-Ready Courses</title>
        <meta
          name="description"
          content="Have questions about our programs? Contact SprintUp for more information on Data Science, Digital Marketing, and Full Stack courses in Lucknow."
        />
        <meta
          name="keywords"
          content="Contact SprintUp, Tech Courses in Lucknow, Get in Touch, Affordable Courses, Jobs, Training"
        />
      </Helmet>

      <div className={styles.contacts}>
        <div className={styles.left_section}>
          <h2>We would love to hear from you!</h2>
          {/* <p>Let us know what you’re after.</p> */}
          {contactData.map((data, i) => {
            return (
              <a href={data.link} key={i}>
                <div className={styles.contactDetalsBox}>
                  <div className={styles.icon}>{data.icon}</div>
                  <div className={styles.contactDetals}>
                    <h3>{data.title}</h3>
                    <p>{data.value}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div className={styles.right_section}>
          <p>Let us know what you’re after.</p>
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              icon={<FaUser />}
              placeholder="Enter your name"
              disabled={isLoading || formSubmitted}
              value={inputName}
              errorMessage={nameError}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Input
              label="Mobile Number"
              icon={<FaPhoneAlt />}
              type="tel"
              placeholder="10 digits Mobile Number"
              value={inputNumber}
              disabled={isLoading || formSubmitted}
              errorMessage={numberError}
              onChange={(e) => setInputNumber(e.target.value)}
            />
            <Textarea
              label="Your Message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={5}
              disabled={isLoading || formSubmitted}
              placeholder="Optional Message (max 200 characters)"
              errorMessage={messageTextError}
            />
            {isLoading ? (
              <div className={styles.form_loader}>
                <LoaderOverlay/>
                {/* <img src="/assets/loader_compressed.gif" alt="loader" /> */}
              </div>
            ) : (
              <Button
                text={formSubmitted ? "Thank You" : "Submit"}
                style={{ width: "100%" }}
                disabled={formSubmitted}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
