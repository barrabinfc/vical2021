import React from "react";
import { cn } from "~/lib/helpers";

import styles from "./SocialMedia.module.scss";
import Icon from "~/components/icon";

export default function SocialMediaList() {
  return (
    <nav aria-label="Social Media" className={cn(styles.socialMedia)}>
      <ul>
        <li>
          <a
            href="https://github.com/barrabinfc"
            target="_blank"
            title="Github"
          >
            <Icon symbol="github-outlined" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/vical12772104"
            target="_blank"
            title="Twitter"
          >
            <Icon symbol="twitter-outlined" target="_blank" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
