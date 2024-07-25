import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
import Sidebar from "../organisms/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";
import Header from "../organisms/Header/Header";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
