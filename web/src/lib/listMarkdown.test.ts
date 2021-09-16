import { resolve } from 'path';
import { test } from 'uvu';
import { expect } from 'chai';

import { listMarkdown } from './listMarkdown';

test('listMarkdown(path) should return a parsed markdown', async () => {
  const markdownFiles = await listMarkdown(resolve(`${__dirname}/../../tests/fixtures/listMarkdown`));
  expect(markdownFiles.size).to.be.greaterThan(0);

  const firstFile = [...markdownFiles][0];
  expect(firstFile).to.include.all.keys('name', 'abspath', 'astro', 'frontmatterExample');
});

test.run();
