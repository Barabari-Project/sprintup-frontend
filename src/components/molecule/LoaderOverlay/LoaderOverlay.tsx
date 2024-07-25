import React from "react";
import styles from "./LoaderOverlay.module.scss";

const LoaderOverlay: React.FC = () => {
  return (
    <div className={styles.loaderOverlay}>
      <img src="/assets/loader_compressed.gif" alt="loader" />
    </div>
  );
};

export default LoaderOverlay;
