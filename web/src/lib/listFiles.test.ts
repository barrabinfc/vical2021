import { test } from "uvu";
import { assert } from "chai";

import { listFiles } from "./listFiles";

test("listFiles(path) should return all files in path", async () => {
  const filesInDir = await listFiles(__dirname);
  assert.equal("size" in filesInDir, true);
});

test("listFiles(path) should filter by filterFn", async () => {
  const filesInDir = await listFiles(__dirname, ({ name, abspath }) => {
    return false;
  });
  assert.equal(filesInDir.size, 0);
});

test.run();
