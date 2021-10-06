import React from 'react';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import fs from 'fs';
import * as ReactTest from '../../../tests/setup/react';

import Tag, { TagVariant } from './Tag';
import TagStyle from './Tag.module.scss';

const tagSuite = suite('components/Tag');
tagSuite.before(ReactTest.setup);
tagSuite.before.each(ReactTest.reset);

tagSuite('Should render <Tag /> with a default class ', () => {
  const { container } = ReactTest.render(<Tag />);
  const el = container.querySelector('.tag');
  assert.match(el.className, 'default');
});
tagSuite('Should render <Tag /> with children ', () => {
  const { container } = ReactTest.render(<Tag>Food</Tag>);
  const el = container.querySelector('.tag');
  assert.match(el.textContent, 'Food');
});
tagSuite('Should render <Tag /> with variants ', () => {
  const { container } = ReactTest.render(<Tag variant={TagVariant.SUCCESS} />);
  const el = container.querySelector('.tag');
  assert.match(el.className, 'success');
});
tagSuite('All variants should have a style class', () => {
  for (let [variantId, variant] of Object.entries(TagVariant)) {
    assert.ok(TagStyle[variant], `Variant ${variant} doesn't have a style class with same name`);
  }
});

tagSuite.run();
