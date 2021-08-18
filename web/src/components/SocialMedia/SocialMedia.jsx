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
            <Icon symbol="github-outlined" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/vical12772104">
            <Icon symbol="twitter-outlined" target="_blank" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
