import React from "react";
import "./style.scss";

interface ButtonProps {
  className?: string;
  text: string | React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  className,
  text,
  onClick,
  disabled,
  style,
}) => {
  return (
    <button
      className={`app_btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
