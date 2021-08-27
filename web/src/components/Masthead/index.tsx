import React from "react";

import styles from "./masthead.module.scss";
import { cn } from "~/lib/helpers";

function InlineImage({src,alt}: {src: string, alt: string}){
  if(src.match(/svg/)) {
    return <svg className={cn(styles.logo)} data-src={src} width="76" color="var(--surface4)"></svg>
  } else {
    <img alt={alt} src={src} className={cn(styles.logo)} />
  }
}

export default function MastHead({
  title,
  subtitle = null,
  image = null,
  className
}) {
  return (
    <div className={cn(styles.masthead, className)}>
      <div className={cn(styles.contentContainer)}>
        <h1 className={cn(styles.title)}>{title}</h1>
        {subtitle && <h3 className={cn(styles.subtitle)}>{subtitle}</h3>}
        {image && <InlineImage src={image} alt={title} />}
      </div>
    </div>
  );
}
