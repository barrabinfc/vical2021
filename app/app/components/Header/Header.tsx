import React from "react";
import { cn } from "~/lib/helpers";

// import useWindowScrollPosition from '@rehooks/window-scroll-position';
import Icon from "../icon";
import Navigation, { links as NavLinks } from "../Navigation/Navigation";

import styles from "./Header.module.css";
import { hydrate } from "react-dom";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  ...NavLinks(),
];

export default function Header({ sticky = false }: { sticky: boolean }) {
  let headerVariant: string[] = [];
  // if (sticky && !import.meta.env.SSR) {
  //   const position = useWindowScrollPosition({ throttle: 100 });
  //   headerVariant = (position.y >= 32 && ['sticky']) || [];
  // }

  return (
    <div className={cn("header", ...headerVariant)}>
      <a className="skipmain" href="#main">
        Skip to main content
      </a>

      <div className="branding">
        <a href="/">
          <span className="visually-hidden">Home</span>
          <Icon symbol="vical" />
        </a>
      </div>

      <Navigation />
    </div>
  );
}
