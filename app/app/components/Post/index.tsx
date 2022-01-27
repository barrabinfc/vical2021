import React from "react";
import { cn } from "~/lib/helpers";
import { Page } from "~/lib/page";

import styles from "./post.module.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export interface PostProps {
  post: Page;
  children: React.ReactElement | React.ReactElement[];
}

export default function Post({ children }: PostProps) {
  return <section className={cn("post", "wrapper-fluid")}>{children}</section>;
}
