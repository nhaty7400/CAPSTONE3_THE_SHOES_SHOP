import React, { Fragment, ReactNode, PropsWithChildren } from "react";
import "./global-style.scss";

/** Cách 1: */
type Props = {
  children: ReactNode;
};

/** PropsWithChildren: cách 2 */
function GlobalStyle(props: PropsWithChildren) {
  const { children } = props;
  return <Fragment>{children}</Fragment>;
}

export default GlobalStyle;
