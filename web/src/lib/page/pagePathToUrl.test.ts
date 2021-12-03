import { test } from 'uvu';
import { expect } from 'chai';

import { readFileSync } from 'fs';
import { resolve } from 'path';

import { pagePathToUrl } from './pagePathToUrl';

/** Get the absolute path of pages by reading astroConfig */
const vicalPackage = readFileSync(resolve('package.json'), 'utf8');
const astroConfig = JSON.parse(vicalPackage || '{}').astroConfig;
export const abspathOfPages = resolve(astroConfig.pages);

const abspathFixtures = [
  `${abspathOfPages}/projects/iching/index.md`,
  `${abspathOfPages}/garden/complexity/introduction to complexity.md`,
  `${abspathOfPages}/garden/hipocratic-oath-for-developers.md`
];

test('pagePathToUrl(projects/iching/index) should return the correct URL for index', async () => {
  expect(pagePathToUrl(abspathFixtures[0]).pathname).to.match(/^\/projects\/iching$/);
});
test('pagePathToUrl(garden/complexity/introduction to complexity) should return the correct URL for index', async () => {
  expect(pagePathToUrl(abspathFixtures[1]).pathname).to.match(/^\/garden\/complexity\/introduction%20to%20complexity$/);
});
test('pagePathToUrl(projects/iching/index) should return the correct URL for index', async () => {
  expect(pagePathToUrl(abspathFixtures[2]).pathname).to.match(/^\/garden\/hipocratic-oath-for-developers$/);
});

test.run();
