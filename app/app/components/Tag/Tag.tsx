import React from "react";

import styles from "./Tag.module.css";
import { cn } from "~/lib/helpers";

export enum TagVariant {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
  TRANSPARENT = "transparent",
}
export interface TagProps {
  children?: React.ReactNode;
  className?: string | string[];
  variant?: TagVariant;
  [key: string]: any;
}

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

/**
 * A simple tag component
 */
export const Tag = ({
  className,
  children,
  variant = TagVariant.DEFAULT,
  ...attrs
}: TagProps) => {
  return (
    <span
      className={cn(
        "tag",
        variant,
        ...(Array.isArray(className) ? className : [className])
      )}
      {...attrs}>
      <strong>{children}</strong>
    </span>
  );
};

export default Tag;
