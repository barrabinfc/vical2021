import { Link, LoaderFunction, RemixServerProps, useLoaderData } from "remix";
import { getPosts } from "~/features/posts";
import { getPost, PostReference, POSTS_FOLDER } from "~/features/posts/posts";

import MinimalLayout from "~/layouts/minimal";

export const loader: LoaderFunction = async ({
  request,
}): Promise<PostReference[]> => {
  const posts = await getPosts();
  return posts.map((filename) => {
    const slug = filename
      .replace(/\.mdx?$/, "")
      .replace(POSTS_FOLDER, "")
      .replace("/", "");
    const url = "/garden/" + slug;
    return {
      filename,
      slug,
      url,
    };
  });
};

export default function Garden() {
  const posts = useLoaderData<PostReference[]>();
  return (
    <MinimalLayout>
      <h1>Digital garden</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.filename}>
            <Link to={post.url}>{post.url}</Link>
          </li>
        ))}
      </ul>
    </MinimalLayout>
  );
}
