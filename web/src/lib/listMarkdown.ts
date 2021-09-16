import { listFiles } from './listFiles';
import { readFileSync } from 'node:fs';

import { pagePathToUrl, Page, MarkdownPageReference } from './page';
import { renderMarkdownWithFrontmatter } from '@astrojs/markdown-support';
import { dirname, relative } from 'node:path';

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
      ...fileParsed.frontmatter,
      astro: fileParsed.astro
    });
  }

  return mdFilesSet;
};
