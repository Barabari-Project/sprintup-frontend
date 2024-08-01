import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import "./style.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  errorMessage?: string | null;
  initialFocus?: boolean;
  preText?: string;
}

const Input: React.FC<InputProps> = ({
  preText,
  label,
  required,
  errorMessage,
  icon,
  initialFocus,
  onChange,
  ...props
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && initialFocus == false) {
      setTimeout(() => inputRef.current?.blur(), 0);
    } else {
    }
  }, []);
  return (
    <div className={`app-input-container ${props.type || ""}`}>
      {label && <label>{label}</label>}
      <div className="inputBar">
        {icon && icon}
        {preText && <span>{preText}</span>}
        <input
          {...props}
          ref={inputRef}
          onChange={handleInputChange}
          className={errorMessage ? "error" : ""}
        />
      </div>
      {props.type === "checkbox" ? (
        <label className="checkbox-label">
          <span className={`checkmark ${props.checked ? "visible" : ""}`}>
            ✔
          </span>
        </label>
      ) : null}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;
