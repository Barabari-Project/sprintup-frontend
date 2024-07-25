// ErrorPage.tsx

import { useNavigate, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import Button from "../../components/atoms/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.user) 
  console.error(error);

  return (
    <div className={styles.errorPage}>
      <div className={styles.imageContainer}>
        <img src="/assets/404Image.gif" alt="Error" />
      </div>
      <div className={styles.content}>
        <h1>Oops!</h1>
        <p>
          <i>{error?.statusText || ""}</i>
        </p>
        <p>
          <i>{error?.error?.message || ""}</i>
        </p>

        <Button onClick={() => navigate(user ? "/dashboard" : "/")} text="Go Home" className={styles.button} />
      </div>
    </div>
  );
}
