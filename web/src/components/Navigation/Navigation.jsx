import React from 'react';
import { cn } from "../../lib/helpers";

import styles from "./Navigation.module.scss";

export default function Navigation({ showNav }) {
  return (
    <nav className={cn(styles.nav, showNav && styles.showNav)}>
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/work">Work</a>
        </li>
      </ul>
    </nav>
  );
}
