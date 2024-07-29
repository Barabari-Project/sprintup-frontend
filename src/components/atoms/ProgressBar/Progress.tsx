import React, { useEffect, useState } from "react";
import styles from "./Progress.module.scss";

export interface ProgressProps {
  progress: number;
  enrolled: boolean;
}

const Progress: React.FC<ProgressProps> = ({ progress, enrolled = false }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    const incrementProgress = () => {
      setCurrentProgress((prev) => {
        if (prev < progress) {
          return Math.min(prev + 1, progress);
        } else if (prev > progress) {
          return Math.max(prev - 1, progress);
        }
        return prev;
      });
    };

    const interval = setInterval(incrementProgress, 40); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      ></div>
      <span
        className={styles.progressValue}
        style={{
          left: !enrolled ? "2%" : `50%`,
          transform: !enrolled ? "translateY(-50%)" : `translate(-50%, -50%)`,

        }}
      >
        {!enrolled ? "Registration Open" : `${currentProgress}%`}
      </span>
    </div>
  );
};

export default Progress;
