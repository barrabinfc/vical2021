import { Link, LoaderFunction, RemixServerProps, useLoaderData } from "remix";
import { getGardenPosts } from "~/features/garden";
import { GARDEN_POSTS_FOLDER } from "~/features/garden/garden";
import { PostReference, POSTS_FOLDER } from "~/features/posts/posts";

import DefaultLayout from "~/layouts/layout";

export const loader: LoaderFunction = async ({
  request,
}): Promise<PostReference[]> => {
  const posts = await getGardenPosts();
  return posts.map((filename) => {
    const slug = filename
      .replace(/\.mdx?$/, "")
      .replace(GARDEN_POSTS_FOLDER, "")
      .replace("/", "");
    const url = slug;
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
    <>
      <h1>Digital garden</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.filename}>
            <Link to={post.url}>{post.slug}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
