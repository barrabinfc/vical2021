import { test, suite } from 'uvu';
import { expect } from 'chai';

import { Page, toPage, isPage } from '../lib/page';
import { expectPageInterface } from '../lib/page/Page.test';
import { listMarkdown } from '../lib/listMarkdown';

import { dirname } from 'node:path';

/**
 * Fetch all root pages
 * @return {MarkdownPage[]}
 */
export const listRootPages = async (): Promise<Page[]> => {
  /** @ts-ignore */
  const cwd = dirname(import.meta?.url?.pathname ?? `${__dirname}/pages`);
  if (!/pages$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/ folder`);
  }

  const markdownFiles = [...(await listMarkdown(cwd))];
  return markdownFiles.map(page => toPage(page, cwd)).filter(markdownPage => markdownPage.published);
};

test('Pages should match Page interface', async () => {
  const rootPages = await listRootPages();

  const pagesSuite = suite('src/pages/');
  rootPages.forEach(page => {
    pagesSuite(`${page.name} should match Page interface`, () => {
      expectPageInterface(page);
    });
  });
  pagesSuite.run();
});

test.run();
