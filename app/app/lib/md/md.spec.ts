import { expect, assert } from "chai";
import path from "path";
import { readFile } from "fs/promises";

import { parse as parseMarkdown } from "./md.server";

describe("lib/md - Markdown module", () => {
  it("parse(filepath, content) - Should render a markdown + frontmatter", async () => {
    interface titleIFace {
      title: string;
    }
    const filePath = path.resolve(__dirname, "./fixtures/title.md");
    const titleMdFile = await readFile(filePath);
    const titleMdContent = titleMdFile.toString();

    const result = await parseMarkdown<titleIFace>({
      filename: filePath,
      body: titleMdContent,
    });
    expect(result.attributes.title.length).to.greaterThan(0);
    expect(result.body).to.not.eql("");
  });
});
