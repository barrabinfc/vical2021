import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import {cn} from '~/lib/helpers';

import Icon from "../icon";
import styles from "./Header.module.scss";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => setShowNav(true);
  const handleHideNav = () => setShowNav(false);

  return (
    <div className={cn(styles.header)}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <a href="/">vical</a>
          <a className={styles.skipMain} href="#main">
            Skip to main content
          </a>
        </div>

        <button
          className={styles.toggleNavButton}
          aria-label="Toggle navigation menu"
          onClick={showNav ? handleHideNav : handleShowNav}
        >
          <Icon symbol="hamburger"></Icon>
        </button>

        <Navigation showNav={showNav}></Navigation>
      </div>
    </div>
  );
}
