import React, { InputHTMLAttributes } from "react";
import "./style.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  errorMessage?: string | null;
}

const Input: React.FC<InputProps> = ({ label, required, errorMessage, icon, onChange, ...props }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };
  return (
    <div className={`app-input-container ${props.type || ""}`}>
      {label && (
        <label>
          {label}
        </label>
      )}
      <div className="inputBar">
      {icon && icon }
      <input {...props} onChange={handleInputChange} className={errorMessage ?  "error" : ""} />
      </div>
      {props.type === "checkbox" ? (
        <label className="checkbox-label">
          <span className={`checkmark ${props.checked ? "visible" : ""}`}>✔</span>
        </label>
      ) : null}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;