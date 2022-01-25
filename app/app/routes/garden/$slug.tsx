import React from "react";
import { useLoaderData, LoaderFunction, useParams, MetaFunction } from "remix";
import { getMDXComponent } from "mdx-bundler/client";

import { getGardenPost } from "~/features/garden";
import { Page } from "~/lib/page/Page";
import { renderMDX } from "~/lib/md";

import styles from "../../features/garden/garden.module.css";
// import styles from "$features/garden/garden.module.css";

export const loader: LoaderFunction = async ({
  params,
}): Promise<{ post: Page; code: string }> => {
  const post = await getGardenPost<Page["attributes"]>(params["slug"] || "");
  const body = await renderMDX(post.body);

  return { post: post, code: body.code };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

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
    <section className="post">
      <Component />
    </section>
  );
}
