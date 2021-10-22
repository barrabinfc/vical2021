import React, { useState } from 'react';
import { cn } from '../../lib/helpers';

import styles from './Navigation.module.scss';
import Icon from '../icon';

export default function Navigation() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => setShowNav(true);
  const handleHideNav = () => setShowNav(false);

  return (
    <nav className={cn(styles.nav)}>
      <button
        className={styles.toggleNavButton}
        aria-label="Toggle navigation menu"
        aria-expanded={showNav}
        onClick={showNav ? handleHideNav : handleShowNav}
      >
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
