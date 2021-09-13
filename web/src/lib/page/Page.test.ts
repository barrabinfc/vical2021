import { test, suite } from 'uvu';
import { expect } from 'chai';

import { isPage, Page, PageContent } from './Page';
import { pagePathToUrl } from './pagePathToUrl';

export const expectPageInterface = (page: Page): void => {
  const errors: string[] = [];
  isPage(page, { errors });
  if (errors.length) {
    expect.fail(false, true, errors.join('\n'), 'isPage');
  } else {
    expect(true).to.be.true;
  }
};

const pageContent: PageContent = {
  title: 'hello world',
  description: 'Hello World',
  props: {},
  headers: [],
  content: '<h1>Hello world</h1>'
};

test('Page should match Page interface', () => {
  const abspath = `${__dirname}/abcd.md`;
  const serializedPage: Page = {
    name: 'abcd',
    abspath: abspath,
    slug: 'abcd',
    collection: [],
    layout: 'helloWorld.astro',
    status: 'draft',
    url: pagePathToUrl(abspath),
    tags: [],
    schema: 'article',
    content: pageContent,
    published: true,
    publishedAt: new Date('2021-10-21')
  };

  expectPageInterface(serializedPage);
});

test.run();
