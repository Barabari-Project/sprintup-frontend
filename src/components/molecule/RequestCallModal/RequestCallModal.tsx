import React, { useState } from "react";
import styles from "./RequestCallModal.module.scss";
import { Modal } from "../../atoms/Modal/Modal";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { toast } from "react-toastify";
import { validateName, validatePhoneNumber } from "../../../utils/validations";
import axiosInstance from "../../../utils/axiosInstance";
import restEndPoints from "../../../data/restEndPoints.json";

interface RequestCallModal {
  onClose: () => void;
}

const RequestCallModal: React.FC<RequestCallModal> = ({ onClose }) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

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
      name: inputName,
      phoneNumber: inputNumber
    };

    try {
      const response = await axiosInstance.post(`/${restEndPoints.requestACall}`, data);
      setFormSubmitted(true);
      toast.success(response.data.message);
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
    finally {
      setLoading(false);
    }

    setLoading(true);
  };

  return (
    <Modal className={styles.requestCallModal}>
      <div>
        <div onClick={() => onClose()} className={styles.closeBtn}>
          <IoMdCloseCircleOutline />
        </div>
        <h2 className={styles.modalTitle}>Start Your Tech Career Now</h2>
        <p className={styles.modalSubTitle}>Book a free counselling session</p>
        <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
          <Input
            label="Full Name"
            initialFocus={false}
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
            initialFocus={false}
            type="tel"
            placeholder="10 digits Mobile Number"
            value={inputNumber}
            disabled={isLoading || formSubmitted}
            errorMessage={numberError}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          {isLoading ? (
            <div className="form-loader">
              <img src="/assets/loader_compressed.gif" alt="loader" />
            </div>
          ) : (
            <Button
              text="Request a Callback"
              style={{ width: "100%", marginTop: "0.8rem" }}
              disabled={formSubmitted}
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default RequestCallModal;
