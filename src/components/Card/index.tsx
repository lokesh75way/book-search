import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

export default function Card(
  props: PropsWithChildren & { className?: string }
) {
  return (
    <div className={clsx(styles.card, props?.className)}>{props.children}</div>
  );
}
