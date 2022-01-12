/**
 * A blog post
 */
export type Post = {
  slug: string;
  title: string;
  content: string;
};

export function getPosts() {
  const posts: Post[] = [
    {
      slug: "first post",
      title: "First Post",
      content: "",
    },
    {
      slug: "second post",
      title: "second Post",
      content: "",
    },
  ];
  return posts;
}
