import React from "react";

export const cn = (...args) => {
  return args.filter(Boolean).join(" ");
};

export const range = n => {
  return Array.from({ length: n }).map((_, i) => i);
};

/**
 * Errors log formatting helpers
 */
export const errorId = (method, error) => {
  if (error) {
    return `${method}(${error})`;
  } else {
    return method;
  }
};

/**
 *  Check if there's a children passed
 *  (because astro will always fill children, but with props.value = '')
 */
export const hasReactChildren = (child: React.ReactElement): boolean => {
  return (
    child &&
    child["$$typeof"] &&
    child["$$typeof"] === Symbol.for("react.element") &&
    child.props &&
    child.props.value &&
    child.props.value !== ""
  );
};

/**
 * Read a ISO string
 */
export const fromISOString = str => {
  return Date.parse(str);
};

/** Convert from MilliTimestamp (javascript default) to unix  */
export const toUnixTimestamp = (milliTimestamp: number): UnixTimestamp => {
  return (milliTimestamp / 1000) as UnixTimestamp;
};

/* From Unix timestamp to DMY(internatially popular) string date   */
export const toDMYDateString = (unixTimestamp: UnixTimestamp): string => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString("pt-BR");
};

/**
 * Slugify
 * Transform `txt` into a url friendly slug.
 * Capitalize each word, join it together, and strip non 09AZ-_ chars
 */
export const slugifyRaw = (
  splitTransform: [string, string] = [" ", ""],
  txt: string = ""
): string => {
  return txt
    .trim()
    .split(splitTransform[0])
    .map(
      token => token.slice(0, 1).toUpperCase() + token.slice(1).toLowerCase()
    )
    .join(splitTransform[1])
    .replace(/[^0-9a-z_-]/gi, "");
};

export const slugify: (txt: string) => string = slugifyRaw.bind(null, null);
export const slugifyFilepath: (txt: string) => string = slugifyRaw.bind(null, [
  "/",
  "-"
]);

/** Emojify status */
export const emojifyStatus = (
  status: "draft" | "in progress" | "complete"
): string => {
  switch (status) {
    case "draft":
      return "🌱";
    case "in progress":
      return "🌿";
    case "complete":
      return "🌳";
    default:
      return "❌";
  }
};
