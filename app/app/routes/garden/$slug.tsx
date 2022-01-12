import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import htmr from "htmr";

import { getGardenPosts } from "~/features/garden";
import { Post } from "~/features/posts";

export const loader: LoaderFunction = async ({ params }) => {
  const posts = await getGardenPosts();
  for(let post of posts){
    if(post.slug === params.slug){
      return post;
    }
  }
  return null
};

export default function GardenSlug() {
  const post = useLoaderData<Post>();
  return (
    <section>
      <h1>{post.title}</h1>
      <pre>Post - {post.slug}</pre>
      {htmr(post.content)}
    </section>
  );
}
