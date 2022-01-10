import { Link, useLoaderData } from "remix";
import { GardenPost, getGardenPosts } from "~/features/garden";

import MinimalLayout from "~/layouts/minimal";
export const loader = getGardenPosts;

export default function Garden() {
  const posts = useLoaderData<GardenPost[]>();
  return (
    <MinimalLayout>
      <h1>Digital garden</h1>
      <p>Some of my pages</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </MinimalLayout>
  );
}
