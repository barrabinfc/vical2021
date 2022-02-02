import React from "react";
import { useLoaderData, LoaderFunction, useParams, MetaFunction } from "remix";
import { getMDXComponent } from "mdx-bundler/client";

import { getGardenPost } from "~/features/garden";
import { Page } from "~/lib/page/Page";
import { renderMDX } from "~/lib/md";
import {
  emojifyStatus,
  toDMYDateString,
  toReadableDateString,
} from "~/lib/helpers";

import Masthead, { links as MastheadLinks } from "~/components/Masthead";
import Tag, { TagVariant, links as TagLinks } from "~/components/Tag/Tag";
import Post, { links as PostLinks } from "~/components/Post";

export const loader: LoaderFunction = async ({
  params,
}): Promise<{ post: Page; code: string }> => {
  const post = await getGardenPost<Page["attributes"]>(params["slug"] || "");
  const body = await renderMDX({ body: post.body });

  return { post: post, code: body.code };
};

export function links() {
  return [
    // { rel: "stylesheet", href: styles },
    ...MastheadLinks(),
    ...PostLinks(),
    // ...TagLinks(),
  ];
}

export const meta: MetaFunction = ({ data }) => {
  const post: Page = data.post;
  return {
    title: post.attributes.title ?? "",
    description: post.attributes.description ?? "",
  };
};

export default function GardenSlug() {
  let { post, code } = useLoaderData<{ post: Page; code: string }>();
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <article id="content">
      <Masthead
        className="post-masthead surface4"
        title={post.attributes.title}
        subtitle={post.attributes.subtitle || ""}>
        {post.attributes.tags && (
          <div className="metadata-container" aria-label="Tagged as">
            <span className="date-container">
              <Tag
                className="status"
                variant={TagVariant.TRANSPARENT}
                aria-label={post.attributes.status}>
                {emojifyStatus(post.attributes.status)}
              </Tag>
              <time
                className="publishedAt"
                dateTime={post.attributes.publishedAt?.toString()}
                aria-label={`Published at: ${toReadableDateString(
                  new Date(post.attributes.publishedAt)
                )}`}>
                {toDMYDateString(new Date(post.attributes.publishedAt))}
              </time>
            </span>
            <span className="tags-container" aria-label="Tagged as">
              {post.attributes.tags.map((tag) => (
                <Tag className="tag" variant={TagVariant.TRANSPARENT} key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          </div>
        )}
      </Masthead>

      <Post post={post}>
        <Component />
      </Post>
    </article>
  );
}
