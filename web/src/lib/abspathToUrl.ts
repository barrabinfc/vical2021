/**
 * Convert a absolute path to a URL route
 */
import config from "../../astro.config";
import { resolve, dirname, relative, basename } from "node:path";

const { projectRoot, pages } = config;

const abspathOfPages = resolve(pages);

export const nameToUrl = (filepath: string): string => {
  const relativePath = relative(abspathOfPages, filepath);
  const filename = basename(relativePath, ".md");
  const addressOfFilename = dirname(relativePath);

  return (
    "/" +
    addressOfFilename +
    (filename !== "index" ? "/" + encodeURIComponent(filename) : "")
  );
};
