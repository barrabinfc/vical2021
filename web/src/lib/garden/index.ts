import { dirname, relative } from 'node:path';
import { Page, toPage } from '../page';
import { listMarkdown } from '../listMarkdown';

/**
 * Fetch all garden posts in the folder 'src/pages/garden'.
 * @return {Page[]}
 */
export const listGarden = async (): Promise<Page[]> => {
  /** @ts-ignore */
  const cwd = dirname(import.meta?.url?.pathname ?? `${__dirname}/garden`);
  if (!/garden$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/garden/ folder: ${cwd}`);
  }

  const markdownFiles = [...(await listMarkdown(cwd))];
  const pages = markdownFiles.map(page => toPage(page, cwd));
  // .filter(page => page.published);
  // .sort((pageA, pageB) => pageB.publishedAt - pageA.publishedAt);

  return pages;
};
