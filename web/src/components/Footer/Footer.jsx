import React from "react";
import { cn } from "~/lib/helpers";

import styles from "./Footer.module.scss";

import SocialMediaList from "../SocialMedia/SocialMedia";

export default function Footer() {
  return (
    <div className={cn(styles.footer)}>
      <SocialMediaList />
    </div>
  );
}
