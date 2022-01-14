import { useLoaderData, LoaderFunction, useParams } from "remix";
import htmr from "htmr";
import { getMDXComponent } from "mdx-bundler/client";

import { getGardenPosts } from "~/features/garden";
import { getPost, PostReference } from "~/features/posts";
import { Page } from "~/lib/page/Page";
import { renderMDX } from "~/lib/md";
import React from "react";

import { Simplify } from "type-fest";

export const loader: LoaderFunction = async ({
  params,
}): Promise<{ post: Page; code: string }> => {
  const post = await getPost<Page["attributes"]>(params.slug || "");
  const body = await renderMDX(post.body);
  return { post: post, code: body.code };
};

export default function GardenSlug() {
  let { post, code } = useLoaderData();
  let { slug } = useParams();
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <section>
      {/* {post} */}
      <h1>Post {slug}</h1>
      <pre>{JSON.stringify(post.attributes, null, "\t")}</pre>
      <pre>{post.body}</pre>
      {<Component />}
    </section>
  );
}
