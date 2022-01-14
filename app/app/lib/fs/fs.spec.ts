import { expect, assert } from "chai";

import { getMatchingFiles } from "./fs";

describe("lib/fs - Filesystem helpers", () => {
  describe("getMatchingFiles", () => {
    it("should return an array of files path", async () => {
      const files = await getMatchingFiles("./", [/.ts$/g]);
      assert.isArray(files);
      expect(files.length).to.greaterThan(0);
    });
  });
});
