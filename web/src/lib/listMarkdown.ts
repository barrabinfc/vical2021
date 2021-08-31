import { listFiles, FileRef } from "./listFiles";
import { dirname, relative } from "node:path";
import { readFileSync } from "node:fs";

import { renderMarkdownWithFrontmatter } from "@astrojs/markdown-support";

export interface MarkdownContent {
  name: string;
  abspath: string;
  frontmatter: Record<string, any>;
  astro: {
    headers: any[];
    source: string;
    html: string;
  };
  content: string;
}

/**
 * Fetch all projects in the folder 'src/pages/projects'.
 * @return {MarkdownContent[]}
 */
export const listMarkdown = async (
  path: string
): Promise<Set<MarkdownContent>> => {
  const mdFilesRefSet = await listFiles(path, ({ name }) =>
    /(.md)$/.test(name)
  );

  /** Parse Markdown using astro */
  const mdFilesSet = new Set<MarkdownContent>();
  for (let mdFileRef of mdFilesRefSet) {
    let fileRawContent = readFileSync(mdFileRef.abspath).toString();
    let fileParsed = await renderMarkdownWithFrontmatter(fileRawContent);

    mdFilesSet.add({
      name: mdFileRef.name,
      abspath: mdFileRef.abspath,
      ...fileParsed
    });
  }

  return mdFilesSet;
};
