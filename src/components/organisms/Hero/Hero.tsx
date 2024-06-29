import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Carausal from "../../molecule/Carausal/Carausal";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
// import Lottie from "react-lottie-player";
// import loaderData from "/assets/Lottie/loader.json";
import carausalData from "../../../data/carausalData.json";
import demoSessionSchedule from "../../../data/demoSessionSchedule.json";
import { toast } from "react-toastify";
import { useFormContext } from "../../../context/formContext";
import restEndPoints from "../../../data/restEndPoints.json";

export interface ProfileData {
  image: string;
  desc: string;
  name: string;
  location: string;
}
export interface SlideData {
  title: string;
  image?: string;
  desc?: string[];
  profiles?: ProfileData[];
  type?: "image" | "profile";
}

const Hero: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<Number | null>(0);
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const { isLoading, setLoading, formSubmitted, setFormSubmitted } = useFormContext();

  const validateName = (value: string): string | null => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (!namePattern.test(value)) {
      return "Name should only contain alphabets and spaces.";
    }
    if( value.trim().length>50 ){
      return "Name should not have more than 50 characters.";
    }
    return null;
  };
  const validatePhoneNumber = (value: string): string | null => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return null;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(inputName);
    const numberError = validatePhoneNumber(inputNumber);
    setNameError(nameError);
    setNumberError(numberError);

    if (nameError || numberError) {
      return;
    }

    setLoading(true);
    const date =
      timeSlot === 0
        ? null
        : timeSlot === 1
          ? demoSessionSchedule[0]["date-be"]
          : demoSessionSchedule[1]["date-be"];
    const time =
      timeSlot === 0 ? null : timeSlot === 1 ? demoSessionSchedule[0].time : demoSessionSchedule[1].time;

    const data = {
      name: inputName.trim(),
      phoneNumber: inputNumber.trim(),
      date: date,
      time: time,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/${restEndPoints.bookALiveClass}`,
        data
      );
      console.log("Response:", response.data);
      setFormSubmitted(true);
      toast.success("Class successfully booked.");
    } catch (error) {
      console.error("There was an error making the request:", error);
      toast.error("Something went wrong. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero">
        <Carausal data={carausalData} />
        <div className="hero-right">
          <div className="hero-form">
            <div className="form-title">
              <h2>Build Your Tech Career With Us</h2>
            </div>
            <div className="form-subtitle">
              <h3>Best full-stack course designed</h3>
              <h3> by IIT & BITS alums</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                icon={<FaUser />}
                placeholder="Full Name"
                value={inputName}
                disabled={isLoading || formSubmitted}
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
              <div className="hero-form-slots">
                <div
                  className={`timeSlot ${timeSlot === 0 && "active"}`}
                  onClick={() => {
                    isLoading ||
                      (!formSubmitted &&
                        setTimeSlot(0));
                  }}
                >
                  <p>No Preference</p>
                </div>

                <div
                  className={`timeSlot ${timeSlot === 1 && "active"}`}
                  onClick={() => {
                    isLoading ||
                      (!formSubmitted &&
                        setTimeSlot(timeSlot === 1 ? 0 : 1));
                  }}
                >
                  <p>{demoSessionSchedule[0]["date-fe"]}</p>
                  <p>{demoSessionSchedule[0].time}</p>
                </div>

                <div
                  className={`timeSlot ${timeSlot === 2 && "active"}`}
                  onClick={() => {
                    isLoading ||
                      (!formSubmitted &&
                        setTimeSlot(timeSlot === 2 ? 0 : 2));
                  }}
                >
                  <p>{demoSessionSchedule[1]["date-fe"]}</p>
                  <p>{demoSessionSchedule[1].time}</p>
                </div>
              </div>
              {isLoading ? (
                <div className="form-loader">
                  {/* <Lottie
                    loop
                    animationData={loaderData}
                    play
                    style={{ width: 40, height: 40 }}
                  /> */}
                  <img src="/assets/loader_compressed.gif" alt="loader" />
                </div>
              ) : (
                <Button
                  text={formSubmitted ? "You have Booked Class!": "Book a Live Class for Free"}
                  style={{ width: "100%", marginTop: "0.8rem" }}
                  disabled={formSubmitted}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
