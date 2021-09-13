import { dirname } from 'node:path';
import { listMarkdown, toPage } from '../../lib/listMarkdown';

/**
 * Fetch all projects in the folder 'src/pages/projects'.
 * @return {MarkdownPage[]}
 */
export const listProjects = async (): Promise<MarkdownPage[]> => {
  /** @ts-ignore */
  const cwd = dirname(import.meta?.url?.pathname ?? `${__dirname}/projects`);
  if (!/projects$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/projects/ folder`);
  }

  const markdownFiles = [...(await listMarkdown(cwd))];
  return markdownFiles.map(page => toPage(page, cwd)).filter(markdownPage => markdownPage.published);
};
