import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Carausal from "../../molecule/Carausal/Carausal";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import carausalData from "../../../data/carausalData.json";
import { toast } from "react-toastify";
import { useFormContext } from "../../../context/formContext";
import restEndPoints from "../../../data/restEndPoints.json";
import { validateName, validatePhoneNumber } from "../../../utils/validations";
import axiosInstance, { eventAxiosInstance } from "../../../utils/axiosInstance";
import { EventType } from "../../../types/types";
import LoaderOverlay from "../../molecule/LoaderOverlay/LoaderOverlay";

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
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const { isLoading, setLoading, formSubmitted, setFormSubmitted } =
    useFormContext();

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
    const data = {
      name: inputName.trim(),
      phoneNumber: inputNumber.trim(),
    };

    try {
      const response = await axiosInstance.post(`/${restEndPoints.bookALiveClass}`, data);
      setFormSubmitted(true);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
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
              <h2>Build Your Career With Us</h2>
            </div>
            <div className="form-subtitle">
              <h3>Top courses designed by</h3>
              <h3>IIT & BITS alums</h3>
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
                onChange={(e) => {
                  setInputNumber(e.target.value);
                  if (10 == e.target.value.length) {
                    eventAxiosInstance.post(`/${restEndPoints.event}`, { type: EventType.FORM_HOME, phoneNumber: e.target.value })
                  }
                }}
              />
              {isLoading ? (
                <div className="form-loader">
                  <LoaderOverlay/>
                  {/* <img src="/assets/loader_compressed.gif" alt="loader" /> */}
                </div>
              ) : (
                <Button
                  text={
                    formSubmitted
                      ? "We will contact you soon."
                      : "Request a Callback"
                  }
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
