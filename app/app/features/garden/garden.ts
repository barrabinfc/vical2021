import path from "path";
import fs from "fs/promises";

import { Post } from "~/features/posts";

/**
 * A garden post (a garden is like a wiki page)
 */
export type GardenPost = Post;

export async function getGardenPosts() {
  // const gardenPath = path.join(__dirname, "posts");

  // const dir = await fs.readdir(gardenPath);

  const posts: Post[] = [
    {
      slug: "first post",
      title: "First Post",
    },
    {
      slug: "second post",
      title: "second Post",
    },
  ];
  return posts;
}
