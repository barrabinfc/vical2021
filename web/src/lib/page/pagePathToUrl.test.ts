import { test } from 'uvu';
import { expect } from 'chai';

import { pagePathToUrl } from './pagePathToUrl';

const abspathFixtures = [
  '/Users/vitorcalejuri/Projects/vical.me/web/src/pages/projects/iching/index.md',
  '/Users/vitorcalejuri/Projects/vical.me/web/src/pages/garden/complexity/introduction to complexity.md',
  '/Users/vitorcalejuri/Projects/vical.me/web/src/pages/garden/hipocratic-oath-for-developers.md'
];

test('pagePathToUrl(projects/iching/index) should return the correct URL for index', async () => {
  expect(pagePathToUrl(abspathFixtures[0]).pathname).to.be.equal('/projects/iching');
});
test('pagePathToUrl(garden/complexity/introduction to complexity) should return the correct URL for index', async () => {
  expect(pagePathToUrl(abspathFixtures[1]).pathname).to.be.equal('/garden/complexity/introduction%20to%20complexity');
});
test('pagePathToUrl(projects/iching/index) should return the correct URL for index', async () => {
  expect(pagePathToUrl(abspathFixtures[2]).pathname).to.be.equal('/garden/hipocratic-oath-for-developers');
});

test.run();
