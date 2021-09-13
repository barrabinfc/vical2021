import { test, suite } from 'uvu';
import { expect } from 'chai';

import { expectPageInterface } from '../../lib/page/Page.test';

import { isPage } from '../../lib/page';
import { listProjects } from './index';

test('Project Pages', async () => {
  const projectPages = await listProjects();

  const pagesSuite = suite('src/pages/projects');
  projectPages.forEach(page => {
    pagesSuite(`${page.name} should match Page interface`, () => {
      expectPageInterface(page);
    });
  });
  pagesSuite.run();
});

test.run();
