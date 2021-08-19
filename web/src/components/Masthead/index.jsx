import React from "react";

import styles from "./masthead.module.scss";
import { cn } from "~/lib/helpers";

export default function MastHead({ title, image = null }) {
  return (
    <div className={cn(styles.masthead)}>
      <div className={cn(styles.contentContainer)}>
        <h1 className={cn(styles.title)}>{title}</h1>
      </div>
    </div>
  );
}
