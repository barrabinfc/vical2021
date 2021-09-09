import { listFiles, FileRef } from "./listFiles";
import { fromISOString, toUnixTimestamp, slugifyFilepath } from "./helpers";
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
 * Convert from MarkdownContent to MarkdownPage
 */
export const toMarkdownPage = (content: MarkdownContent): MarkdownPage => {
  /** Transform from a path/filename.xx into a url friendly slug  */
  const slug = slugifyFilepath(content.name.replace(/\.\w*?$/g, ""));
  const abspath = content.abspath;

  return {
    name: content.name,
    abspath,
    slug,
    path: content.frontmatter.path,
    layout: content.frontmatter.layout,
    schema: content.frontmatter.schema,
    status: content.frontmatter.status,
    published: content.frontmatter.published,
    publishedAt: toUnixTimestamp(
      fromISOString(content.frontmatter.publishedAt)
    ),
    content: {
      title: content.frontmatter.title,
      description: content.frontmatter.subtitle,
      headers: content.astro.headers,
      frontmatter: content.frontmatter,
      content: content.content
    },
    /** Thumbnail? */
    ...(content.frontmatter.thumbnail
      ? {
          thumbnail: {
            url: content.frontmatter.thumbnail
          }
        }
      : {})
  };
};

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
