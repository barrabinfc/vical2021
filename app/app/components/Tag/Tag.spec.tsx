import React from "react";
import ReactDOM from "react-dom";

import { act } from "react-dom/test-utils";
import * as ReactTest from "../../../tests/setup/react";

import { assert, expect } from "chai";

// import * as ReactTest from '../../../tests/setup/react';

import Tag, { TagVariant } from "./Tag";
import TagStyle from "./Tag.module.css";

describe("components/Tag", () => {
  let rootContainer: HTMLDivElement | null;
  beforeEach(ReactTest.setup);
  afterEach(ReactTest.reset);
  it("Should render the default <Tag>", async () => {
    const { container } = ReactTest.render(<Tag />);
    const el = container?.querySelector(".tag");
    expect(el?.className).to.eql("tag default");
  });
  it("Should render <Tag /> with children ", async () => {
    const { container } = ReactTest.render(<Tag>Food</Tag>);
    const el = container?.querySelector(".tag");
    expect(el?.textContent).to.eqls("Food");
  });
  it("Should render <Tag /> with variants ", () => {
    const { container } = ReactTest.render(
      <Tag variant={TagVariant.SUCCESS} />
    );
    const el = container?.querySelector(".tag");
    expect(el?.className).to.eqls("tag success");
  });

  it("All variants should have a style class", () => {
    for (let [variantId, variant] of Object.entries(TagVariant)) {
      // @ts-ignore
      const generatedClassName = TagStyle[variant];
      assert.ok(
        generatedClassName,
        `Variant ${variant} doesn't have a style class with same name`
      );
    }
  });
});
