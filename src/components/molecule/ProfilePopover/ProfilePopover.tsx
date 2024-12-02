import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import styles from "./Profilepopover.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import restEndPoints from "../../../data/restEndPoints.json";
import axiosInstance from "../../../utils/axiosInstance";
import { setUserDetails } from "../../../redux/slices/UserSliice";
import { toast } from "react-toastify";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FiHelpCircle, FiHome } from "react-icons/fi";
import LoaderOverlay from "../LoaderOverlay/LoaderOverlay";

const ProfilePopover: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/${restEndPoints.logout}`);
      localStorage.removeItem("token");
      dispatch(setUserDetails(null));
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.response.data.error);
      if (401 == err.response.status) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {isLoading ? <LoaderOverlay /> : null}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className={styles.profileButton}
            aria-label="Update dimensions"
            title={user.name}
          >
            <img src={`${import.meta.env.VITE_CDN_BASE_URL}/avatar/${user.avatar || "1"}.png`} alt="" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.PopoverContent} sideOffset={20}>
            <h1 className={styles.menuTitle}>
              Hey! <span>{user.name}</span>
            </h1>
            <ul>
              <li>
                <Link to="/dashboard">
                  <FiHome />
                  My Home
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FiHelpCircle />
                  Help Center
                </Link>
              </li>
            </ul>
            <div onClick={handleLogout} className={styles.logOutBtn}>
              <LuLogOut />
              Log Out
            </div>
            <Popover.Arrow className={styles.PopoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default ProfilePopover;
