import { resolve } from "path";
import { test } from "uvu";
import { expect } from "chai";

import { nameToUrl } from "./abspathToUrl";

const abspathFixtures = [
  "/Users/vitorcalejuri/Projects/vical.me/web/src/pages/projects/iching/index.md",
  "/Users/vitorcalejuri/Projects/vical.me/web/src/pages/garden/complexity/introduction to complexity.md",
  "/Users/vitorcalejuri/Projects/vical.me/web/src/pages/garden/hipocratic-oath-for-developers.md"
];
test("nameToUrl(projects/iching/index) should return the correct URL for index", async () => {
  expect(nameToUrl(abspathFixtures[0])).to.be.equal("/projects/iching");
});
test("nameToUrl(garden/complexity/introduction to complexity) should return the correct URL for index", async () => {
  expect(nameToUrl(abspathFixtures[1])).to.be.equal(
    "/garden/complexity/introduction%20to%20complexity"
  );
});
// test("nameToUrl(projects/iching/index) should return the correct URL for index", async () => {
//   expect(nameToUrl(abspathFixtures[0])).to.be.equal("/projects/iching");
// });

test.run();
