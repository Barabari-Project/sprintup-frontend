import React, { useState } from "react";
import styles from "./TalkToUsModal.module.scss";
import { Modal } from "../../atoms/Modal/Modal";
import { IoMdCloseCircleOutline } from "react-icons/io";

import Input from "../../atoms/Input/Input";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Textarea from "../../atoms/TextArea/TextArea";
import Button from "../../atoms/Button/Button";
import { validateMessage } from "../../../utils/validations";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axiosInstance, {
  eventAxiosInstance,
} from "../../../utils/axiosInstance";
import restEndPoints from "../../../data/restEndPoints.json";
import { EventType } from "../../../types/types";

interface TalkToUsModalProps {
  onClose: () => void;
  message: string;
  type: string;
}

const TalkToUsModal: React.FC<TalkToUsModalProps> = ({
  onClose,
  message,
  type,
}) => {
  const [messageText, setMessageText] = useState<string>(message);
  const [messageTextError, setMessageTextError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    eventAxiosInstance.post(`/${restEndPoints.event}`, {
      type: EventType.REQUEST_A_CALLBACK_CLICK,
    });
    const messageTextError = validateMessage(messageText);
    setMessageTextError(messageTextError);

    if (messageTextError) {
      return;
    }
    setLoading(true);
    const data = {
      message: messageText,
      type,
    };
    try {
      const response = await axiosInstance.post(
        `/${restEndPoints.counselling}`,
        data
      );
      setFormSubmitted(true);
      onClose();
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className={styles.talkToUsModal}>
      <div>
        <div onClick={() => onClose()} className={styles.closeBtn}>
          <IoMdCloseCircleOutline />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            icon={<FaUser />}
            disabled={true}
            value={user.name}
          />
          <Input
            label="Mobile Number"
            icon={<FaPhoneAlt />}
            type="tel"
            value={user.phoneNumber || ""}
            disabled={true}
          />
          <Textarea
            initialFocus={false}
            label="Your Message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={5}
            disabled={isLoading || formSubmitted}
            autoComplete="off"
            placeholder="Message (max 200 characters)"
            errorMessage={messageTextError}
            autoFocus={false}
          />
          {isLoading ? (
            <div className={styles.form_loader}>
              <img src="/assets/loader_compressed.gif" alt="loader" />
            </div>
          ) : (
            <Button
              text={formSubmitted ? "Thank You" : "Request a Callback"}
              style={{ width: "100%" }}
              disabled={formSubmitted}
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default TalkToUsModal;
