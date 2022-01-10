import React from 'react';
import Navigation from '../Navigation/Navigation';
import { cn } from '../../lib/helpers';

import useWindowScrollPosition from '@rehooks/window-scroll-position';

import Icon from '../icon';
import styles from './Header.module.scss';
// const styles = {};

export default function Header({ sticky = false }: { sticky: boolean }) {
  let headerVariant = [];
  // if (sticky && !import.meta.env.SSR) {
  //   const position = useWindowScrollPosition({ throttle: 100 });
  //   headerVariant = (position.y >= 32 && ['sticky']) || [];
  // }

  return (
    <div className={cn(styles.header, 'header', ...headerVariant)}>
      <a className={styles.skipMain} href="#main">
        Skip to main content
      </a>

      <div className={styles.branding}>
        <a href="/">
          <span className="visually-hidden">Home</span>
          <Icon symbol="vical" />
        </a>
      </div>

      <Navigation />
    </div>
  );
}
