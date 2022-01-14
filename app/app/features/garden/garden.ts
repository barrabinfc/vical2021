// import path from "path";
// import fs from "fs/promises";

// import { Post } from "~/features/posts";

type Post = {
  slug: string;
  title: string;
  content: string;
};

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
      content: "<h3>This is the 1 post</h3>",
    },
    {
      slug: "second post",
      title: "second Post",
      content: "<h3>This is the 2 post</h3>",
    },
    {
      slug: "third post",
      title: "third Post",
      content: "<h3>This is the 3 post</h3>",
    },
    {
      slug: "4 post",
      title: "4 Post",
      content: "<h3>This is the 4 post</h3>",
    },
  ];
  return posts;
}
