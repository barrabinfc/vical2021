import { test, suite } from 'uvu';
import { expect } from 'chai';

import { expectPageInterface } from '../../lib/page/Page.test';

import { isPage } from '../../lib/page';
import { listGarden } from './index';

test('Garden Pages', async () => {
  const gardenPages = await listGarden();

  const pagesSuite = suite('src/pages/garden');
  gardenPages.forEach(page => {
    pagesSuite(`${page.name} should match Page interface`, () => {
      expectPageInterface(page);
    });
  });
  pagesSuite.run();
});

test.run();
