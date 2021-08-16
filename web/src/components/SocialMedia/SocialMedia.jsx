import React from "react";
import { cn } from "~/lib/helpers";

import styles from "./SocialMedia.module.scss";
import Icon from "~/components/icon";

export default function SocialMediaList() {
  return (
    <nav className={cn(styles.socialMedia)}>
      <ul>
        <li>
          <a href="https://github.com/barrabinfc" target="_blank">
            <Icon symbol="github" />
          </a>
        </li>
        <li>
          <a href="/email">
            <Icon symbol="email" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
