import { useLoaderData, LoaderFunction, useParams, MetaFunction } from "remix";
import { getMDXComponent } from "mdx-bundler/client";

import { getPost } from "~/features/posts";
import { Page } from "~/lib/page/Page";
import { renderMDX } from "~/lib/md";
import React from "react";

import { SetRequired, Simplify } from "type-fest";

export const loader: LoaderFunction = async ({
  params,
}): Promise<{ post: Page; code: string }> => {
  const post = await getPost<Page["attributes"]>(params["slug"] || "");
  const body = await renderMDX(post.body);

  return { post: post, code: body.code };
};

export const meta: MetaFunction = ({ data }) => {
  const post: Page = data.post;
  return {
    title: post.attributes.title ?? "",
    description: post.attributes.description ?? "",
  };
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
