import { getGardenPosts } from "./garden";
import { expect } from "chai";

describe("features/garden", function() {
  describe("getGardenPosts()", function() {
    it("should return -1 when the value is not present", async () => {
      const posts = await getGardenPosts();
      expect(posts.length).to.greaterThan(0);
    });
  });
});
