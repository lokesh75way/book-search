import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

export default function Button(props: React.HTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return <button className={clsx(styles.button, className)} {...rest} />;
}
