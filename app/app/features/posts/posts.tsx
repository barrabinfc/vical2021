/**
 * A blog post
 */
export type Post = {
  slug: string;
  title: string;
};

export function getPosts() {
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
