import { resolve } from 'node:path';
import { Page, toPage } from '../page';
import { listMarkdown } from '../listMarkdown';

/**
 * Fetch all projects in the folder 'src/pages/projects'.
 * @return {MarkdownPage[]}
 */
export const listProjects = async (): Promise<Page[]> => {
  /** @ts-ignore */
  const cwd = resolve(`src/pages/projects`);
  if (!/projects$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/projects/ folder`);
  }

  const markdownFiles = [...(await listMarkdown(cwd))];
  return markdownFiles.map((page) => toPage(page, cwd)).filter((markdownPage) => markdownPage.published);
};
