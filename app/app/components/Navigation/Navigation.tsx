import React, { useState } from "react";
import { cn } from "~/lib/helpers";

import Icon from "../icon";
import styles from "./Navigation.module.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function Navigation(): JSX.Element {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => setShowNav(true);
  const handleHideNav = () => setShowNav(false);

  return (
    <nav className={cn("nav")}>
      <button
        className={"toggleNavButton"}
        aria-label="Toggle navigation menu"
        aria-expanded={showNav}
        onClick={showNav ? handleHideNav : handleShowNav}>
        <Icon symbol="hamburger"></Icon>
      </button>

      <ul role="menu" hidden={!showNav}>
        <li role="menuitem">
          <a href="/about">about</a>
        </li>
        <li role="menuitem">
          <a href="/projects">projects</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
