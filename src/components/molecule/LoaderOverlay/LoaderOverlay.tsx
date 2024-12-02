import React from "react";
import styles from "./LoaderOverlay.module.scss";

const LoaderOverlay: React.FC = () => {
  return (
    <div className={styles.loaderOverlay}>
      <img src={import.meta.env.VITE_CDN_BASE_URL+"/loader_compressed.gif"} alt="loader" />
    </div>
  );
};

export default LoaderOverlay;
