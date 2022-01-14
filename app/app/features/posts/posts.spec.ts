import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { expect, assert } from "chai";
chai.use(chaiAsPromised);

import { readFile } from "fs/promises";
import path from "path";

import { getPosts, validateMarkdown, getPost } from "./posts";
import { isPage } from "~/lib/page";

describe("features/posts", () => {
  describe("getPosts()", () => {
    it("Should return a list of all posts", async () => {
      const result = await getPosts();
      expect(result.length).to.greaterThan(0);
    });
  });

  describe("validateMarkdown()", async () => {
    it("Validate a single markdown", async () => {
      const fixturePath = path.resolve(__dirname, "./fixtures/title.md");
      const content = await readFile(fixturePath, "utf8");
      const result = await validateMarkdown({
        filename: fixturePath,
        body: content.toString(),
      });
      assert(result === true, `(${fixturePath}) is not valid markdown `);
    });
    it("Validate a page markdown", async () => {
      const fixturePath = path.resolve(
        process.cwd(),
        "posts/garden/complexity/introduction-to-complexity.mdx"
      );
      const content = await readFile(fixturePath, "utf8");
      const result = await validateMarkdown({
        filename: fixturePath,
        body: content,
        schemaFn: isPage,
      });
      expect(result).to.equal(true);
    });

    it("Validate all posts - getMarkdownPosts()", async () => {
      const paths = await getPosts();
      const files = await Promise.all(
        paths.map(async (absFilePath) => {
          const content = await readFile(absFilePath, "utf8");
          const result = await validateMarkdown({
            filename: absFilePath,
            body: content.toString(),
          });
          assert(result === true, `${absFilePath} is not valid markdown`);
        })
      );
    });
  });

  describe("getPost(slug)", () => {
    it("Should throw Error if theres no file matching slug", async () => {
      const actionFn = () => getPost("not-a-slug");
      await expect(actionFn()).to.be.rejectedWith(Error);
    });
    it("Should return a MDOutput interface", async () => {
      const page = await getPost<{ layout: string; title: string }>("page");
      expect(page.attributes).to.eqls({
        layout: "minimal-post",
        title: "A example post",
      });
      expect(page.body).is.a("string");
      expect(page.filename).matches(/page/);
    });
    it("Should have parsed markdown in body", async () => {
      expect(true).to.eqls(false);
    });
  });
});
