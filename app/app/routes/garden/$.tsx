import React from "react";
import type { LoaderFunction } from "remix";
import { LinksFunction, MetaFunction, useLoaderData, useParams } from "remix";
import { getMDXComponent } from "mdx-bundler/client";

import { Page } from "~/lib/page";
import { renderMDX } from "~/lib/md";
import { getGardenPost } from "~/features/garden";

import { loader as slugLoader, meta as slugMeta , links as slugLinks } from './$slug';

export const loader: LoaderFunction = async ({ params }) => {
    const post = await getGardenPost<Page["attributes"]>(params["*"] || "");
    const body = await renderMDX(post.body);
  
    return { post: post, code: body.code };  
};

export const meta: MetaFunction = slugMeta;
export const links: LinksFunction = slugLinks;

export default function GardenDeepSlug() {
    let { post, code } = useLoaderData();
    let params = useParams();
    let slug = params["*"];

    const Component = React.useMemo(() => getMDXComponent(code), [code]);
  
    return (
      <section className="post">
        <Component />
      </section>
    );
  }