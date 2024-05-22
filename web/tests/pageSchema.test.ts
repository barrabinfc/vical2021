import { test, suite } from 'uvu';
import { expect } from 'chai';

import { Page, toPage, isPage } from '../src/lib/page';
import { expectPageInterface } from '../src/lib/page/Page.test';

import { dirname, resolve } from 'node:path';

/**
 * Fetch all root pages
 * @return {MarkdownPage[]}
 */
export const listRootPages = async (): Promise<Page[]> => {
  /** @ts-ignore */
  const cwd = resolve(`${__dirname}/../src/pages/`);
  console.log(cwd);
  if (!/pages$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/ folder`);
  }

  const markdownFiles = [];
  return markdownFiles.map((page) => toPage(page, cwd));
};

test('Pages should match Page interface', async () => {
  const rootPages = await listRootPages();

  const pagesSuite = suite('src/pages/');
  rootPages.forEach((page) => {
    pagesSuite(`${page.name} should match Page interface`, () => {
      expectPageInterface(page);
    });
  });
  pagesSuite.run();
});

test.run();
