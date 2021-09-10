import React from 'react';
import { suite } from "uvu";
import * as assert from 'uvu/assert';

import fs from 'fs';
import * as ENV from '~/../tests/setup/env';

import Tag,{TagVariant} from "./Tag";
import TagStyle, {} from './Tag.module.scss';

const tagSuite = suite("components/Tag");
tagSuite.before(ENV.setup);
tagSuite.before.each(ENV.reset);

tagSuite("Should render <Tag /> with a default class ", () => {
  const {container} = ENV.render(<Tag />);
  const el = container.querySelector('dd');
  assert.match(el.className, 'default');
});
tagSuite("Should render <Tag /> with children ", () => {
  const {container} = ENV.render(<Tag>Food</Tag>);
  const el = container.querySelector('dd');
  assert.match(el.textContent, 'Food');
});
tagSuite("Should render <Tag /> with variants ", () => {
  const {container} = ENV.render(<Tag variant={TagVariant.SUCCESS}/>);
  const el = container.querySelector('dd');
  assert.match(el.className, 'success');
});
tagSuite('All variants should have a style class', () => {
  for(let [variantId,variant] of Object.entries(TagVariant)){
    assert.ok(TagStyle[variant],`Variant ${variant} doesn't have a style class with same name`);
  }
});


tagSuite.run();
