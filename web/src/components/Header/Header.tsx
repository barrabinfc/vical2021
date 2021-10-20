import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import { cn } from '../../lib/helpers';

import useWindowScrollPosition from '@rehooks/window-scroll-position';

import Icon from '../icon';
import styles from './Header.module.scss';

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => setShowNav(true);
  const handleHideNav = () => setShowNav(false);

  let headerVariant = [];
  if (!import.meta.env.SSR) {
    const position = useWindowScrollPosition({ throttle: 100 });
    headerVariant = (position.y >= 32 && ['header', 'translucent']) || [];
  }

  return (
    <div className={cn(styles.header, ...headerVariant)}>
      <div className={styles.wrapper}>
        <a className={styles.skipMain} href="#main">
          Skip to main content
        </a>

        <div className={styles.branding}>
          <a href="/">
            <span className="visually-hidden">Home</span>
            <Icon symbol="vical" />
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
