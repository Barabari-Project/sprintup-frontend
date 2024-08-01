import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import styles from "./style.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  customValidation?: (value: string) => string | null;
  errorMessage?: string | null;
  initialFocus?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ errorMessage, label, required, customValidation, onChange, initialFocus, ...props }) => {

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && initialFocus == false) {
      setTimeout(() => textareaRef.current?.blur(), 0);
    } else {
    }
  }, []);

  return (
    <div className={styles.appTextareaContainer}>
      {label && (
        <label>
          {label}
        </label>
      )}
      <div className={styles.textareaBar}>
        <textarea ref={textareaRef}
          {...props} onChange={handleTextareaChange} className={errorMessage ? `${styles.error}` : ""} />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
