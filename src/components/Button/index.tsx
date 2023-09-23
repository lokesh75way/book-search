import React from "react";
import styles from "./index.module.scss";

export default function Button(props: React.HTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.button} {...props} />;
}
