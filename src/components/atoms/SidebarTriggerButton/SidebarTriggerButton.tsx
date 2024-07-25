import React, { useState } from "react";
import styles from "./SidebarTriggerButton.module.scss";
import MobileSidebar from "../../organisms/MobileSidebar/MobileSidebar";

const SidebarTriggerButton: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <div
        className={styles.mobileSidebarButton}
        onClick={() => setSidebarOpen(true)}
      >
        My Menu+
      </div>
      {sidebarOpen && <MobileSidebar isOpen={sidebarOpen} close={closeSidebar} />}
    </>
  );
};

export default SidebarTriggerButton;
