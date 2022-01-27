import React from "react";

import { avoidWidowedWords } from "../../lib/helpers";
import { cn } from "../../lib/helpers";

import styles from "./masthead.module.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export interface InlineImageProps {
  src: string;
  className?: string;
}

function InlineImage({ src, className }: InlineImageProps) {
  console.log(src, className);
  if (src && src.match(/svg/)) {
    return (
      <svg
        className={cn("masthead__logo", className)}
        data-src={src}
        color="var(--surface4)"></svg>
    );
  } else {
    return <img alt="" src={src} className={cn("masthead__logo")} />;
  }
}

export interface MastHeadProps {
  title: string;
  subtitle?: string;
  image?: InlineImageProps;
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

/**
 * A masthead of a page
 * (above the folder cover)
 */
export default function MastHead({
  title,
  subtitle,
  image,
  children,
  className,
}: MastHeadProps) {
  return (
    <div
      data-has-children={Boolean(children)}
      className={cn("masthead", className)}>
      {image && <InlineImage src={image.src} />}
      <div className={cn("contentContainer")}>
        <div className={cn("content", "wrapper-fluid")}>
          <h1 id="title" className={cn("title")}>
            {avoidWidowedWords(title)}
          </h1>
          {subtitle && (
            <h2 className={cn("subtitle")}>{avoidWidowedWords(subtitle)}</h2>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
