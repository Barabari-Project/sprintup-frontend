import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import styles from "./style.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  customValidation?: (value: string) => string | null;
  errorMessage?: string | null;
}

const Textarea: React.FC<TextareaProps> = ({ errorMessage, label, required, customValidation, onChange, ...props }) => {

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      setTimeout(() => textareaRef.current?.blur(), 0);
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
        <textarea
          {...props} onChange={handleTextareaChange} className={errorMessage ? `${styles.error}` : ""} />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
