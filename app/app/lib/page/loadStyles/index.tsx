import React from "react";
import { Style } from "util";

interface StyleLink {
  rel: string;
  href: string;
}

/**
 * Load all stylesheets in `links`.
 * Add a link tag for each stylesheet.
 *
 * @param {StyleLink[]} links
 */
export default function Styles({ links }: { links: StyleLink[] }) {
  console.info("links", links);
  return links.map((link) => (
    <link rel={link.rel} href={link.href} key={link.href} />
  ));
}
