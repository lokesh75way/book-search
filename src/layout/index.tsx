import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";

export default function Default() {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
}
