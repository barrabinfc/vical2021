import { listFiles } from './listFiles';
import { fromISOString, toUnixTimestamp, slugifyFilepath } from './helpers';
import { readFileSync } from 'node:fs';

import { pagePathToUrl, Page } from './page';
import { renderMarkdownWithFrontmatter } from '@astrojs/markdown-support';
import { dirname, relative } from 'node:path';

/** A markdown page with name&abspath */
export interface MarkdownPageReference extends AstroMarkdownPage {
  name: string;
  abspath: string;
}

/**
 * Convert from MarkdownContent to Page interface
 */
export const toPage = (content: MarkdownPageReference, cwd: string): Page => {
  /** Transform from a path/filename.xx into a url friendly slug  */
  const slug = slugifyFilepath(content.name.replace(/\.\w*?$/g, ''));
  const abspath = content.abspath;

  /** Collection is the nested folder structure */
  const relativePath = relative(cwd, dirname(abspath));
  const collection = (relativePath && relativePath.split('/')) || [];

  return {
    name: content.name,
    abspath,
    slug,
    collection,
    url: pagePathToUrl(abspath),
    tags: content.frontmatter?.tags || [],
    layout: content.frontmatter?.layout,
    schema: content.frontmatter?.schema,
    status: content.frontmatter?.status,
    published: content.frontmatter?.published,
    publishedAt: content.frontmatter?.publishedAt,
    content: {
      title: content.frontmatter?.title,
      description: content.frontmatter?.description,
      headers: content.astro.headers,
      props: content.frontmatter,
      content: content.content
    },
    /** Thumbnail? */
    ...(content.frontmatter.thumbnail?.path
      ? {
          thumbnail: {
            path: content.frontmatter.thumbnail?.path,
            width: content.frontmatter.thumbnail?.width ?? undefined,
            height: content.frontmatter.thumbnail?.height ?? undefined
          }
        }
      : {})
  };
};

/**
 * Fetch all md files in the folder `path`
 * @return {Page[]}
 */
export const listMarkdown = async (path: string): Promise<Set<MarkdownPageReference>> => {
  const mdFilesRefSet = await listFiles(path, ({ name }) => /(.md)$/.test(name));

  /** Parse Markdown using astro */
  const mdFilesSet = new Set<MarkdownPageReference>();
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
