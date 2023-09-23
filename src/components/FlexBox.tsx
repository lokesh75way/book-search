import React, { PropsWithChildren, CSSProperties } from "react";

type Props = CSSProperties & PropsWithChildren;

export default function FlexBox(props: Props) {
  const { children, ...rest } = props;
  return <div style={{ display: "flex", ...rest }}>{props.children}</div>;
}
