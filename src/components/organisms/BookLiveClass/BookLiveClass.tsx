import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFormContext } from "../../../context/formContext";
import restEndPoints from "../../../data/restEndPoints.json";
import { validateName, validatePhoneNumber } from "../../../utils/validations";
import axiosInstance, {
  eventAxiosInstance,
} from "../../../utils/axiosInstance";
import { EventType } from "../../../types/types";

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

const BookLiveClassForm: React.FC = () => {
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
      const response = await axiosInstance.post(
        `/${restEndPoints.bookALiveClass}`,
        data
      );
      setFormSubmitted(true);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-a-classd-section">
      <div className="signUpform">
        <div className="formContainer">
          <h2>Book a FREE Demo Class</h2>
          <h3>New batches starting this month ⏰</h3>
          <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
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
                  eventAxiosInstance.post(`/${restEndPoints.event}`, {
                    type: EventType.FORM_HOME,
                    phoneNumber: e.target.value,
                  });
                }
              }}
            />
            {isLoading ? (
              <div className="form-loader">
                <img src="/assets/loader_compressed.gif" alt="loader" />
              </div>
            ) : (
              <Button
                text={
                  formSubmitted
                    ? "You have booked a Class!"
                    : "Book a FREE Demo Class"
                }
                style={{ width: "100%", marginTop: "0.8rem" }}
                disabled={formSubmitted}
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookLiveClassForm;
