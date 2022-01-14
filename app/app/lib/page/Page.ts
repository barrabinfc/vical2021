import * as t from "typanion";
import { ValidationState } from "typanion";

import { slugifyFilepath } from "../helpers";
import { isSimpleISO8601 } from "../validation/isSimpleISO8601";

/** '#115599 BAGUNCA */
import { POSTS_FOLDER } from "~/features/posts/posts";
const abspathOfPages = POSTS_FOLDER;

/**
 * Page schema, according to schema.org
 * @see https://schema.org Schema.org
 */
export const isPageSchema = t.isOneOf(
  [t.isLiteral("article"), t.isLiteral("basic")],
  {
    exclusive: true,
  }
);
export type PageSchema = t.InferType<typeof isPageSchema>;

/** Page status */
export const isPageStatus = t.isOneOf(
  [t.isLiteral("draft"), t.isLiteral("in progress"), t.isLiteral("complete")],
  {
    exclusive: true,
  }
);
export type PageStatus = t.InferType<typeof isPageStatus>;

/** Page body */
const isPageBody = t.isString();
type PageBody = t.InferType<typeof isPageBody>;

/**
 * Page Entity
 * Every page must have those fields.
 */
const pageProps = {
  filename: t.isString(),
  body: t.isString(),
  attributes: t.isObject({
    schema: isPageSchema,
    status: isPageStatus,
    layout: t.isOptional(t.isString()),

    title: t.isOptional(t.isString()),
    subtitle: t.isOptional(t.isString()),
    description: t.isOptional(t.isString()),

    published: t.isOptional(t.isBoolean()),
    publishedAt: t.isOptional(t.isDate()),

    /** Page thumbnail */
    thumbnail: t.isOptional(
      t.isObject(
        {
          path: t.isString(),
          width: t.isOptional(t.isNumber()),
          height: t.isOptional(t.isNumber()),
        },
        {
          extra: t.isUnknown(),
        }
      )
    ),

    tags: t.isArray(t.isString()),
  }),
};

// export const props = pageProps;
const isPageFn = t.isObject(pageProps, { extra: t.isUnknown() });
export function isPage(
  props: any,
  test?: ValidationState | undefined
): props is Page {
  return isPageFn(props, test);
}
export type Page = t.InferType<typeof isPageFn>;

/**
 * A page summary, without content.
 * Useful for hydration, since it will only have the required
 * fields for displaying a preview/link of a page.
 */
interface PageSummary {
  name: string;
  // url: Page["url"];

  // slug: Page['slug'];

  // status: Page['status'];
  // publishedAt: Page['publishedAt'];
  // content: {
  //   title: Page['content']['title'];
  //   subtitle: Page['content']['subtitle'];
  // };
  // thumbnail: Page['thumbnail'];
  // tags: Page['tags'];
  // collection?: Page['collection'];
}

/**
 * Convert a Page to a Page summary
 * @deprecated
 const toPageSummary = (page: MarkdownPageReference): PageSummary => {
   let name, slug, abspath, relativePath, collection;
   
  //  MarkdownPageReference
   abspath = urlToPagePath(page.file);
   
   name = basename(abspath);
   relativePath = relative(abspathOfPages, dirname(abspath));
   
    // * Transform from  url.com/path/filename into a url friendly slug  
   slug = slugifyFilepath(`${relativePath}/${name}`);
   collection = (relativePath && relativePath.split('/')) || [];
   
   return {
     name: name,
     url: pagePathToUrl(abspath),
     slug: slug,
     content: {
       title: page.title,
       subtitle: page.subtitle
      },
      thumbnail: page.thumbnail,
      tags: page.tags,
      status: page.status,
      publishedAt: page.publishedAt,
      collection: collection ?? []
    };
  };
*/

/**
 * Convert to Page interface
 */
// function toPage(content: MarkdownPageReference, cwd?: string): Page;
// function toPage(content: MarkdownPage, cwd?: string): Page {
//   let name, slug, abspath, relativePath, collection;

//   /** Transform from  url.com/path/filename into a url friendly slug  */
//   abspath = urlToPagePath(content.url);
//   name = basename(abspath);
//   slug = slugifyFilepath(name.replace(/\.\w*?$/g, ''));

//   relativePath = relative(abspathOfPages, dirname(abspath));
//   collection = (relativePath && relativePath.split('/')) || [];

//   /** Get all other properties(frontmatter) that is not reserved  */
//   const reservedProps = ['astro', ...Object.keys(pageProps)];
//   const otherProps = Object.fromEntries(Object.entries(content).filter(([key, v]) => !reservedProps.includes(key)));

//   return {
//     name,
//     abspath,
//     slug,
//     collection,
//     url: pagePathToUrl(abspath),
//     tags: content?.tags || [],
//     layout: content?.layout,
//     schema: content?.schema,
//     status: content?.status,
//     published: content?.published,
//     publishedAt: new Date(content?.publishedAt),
//     content: {
//       title: content?.title,
//       subtitle: content?.subtitle,
//       description: content?.description,
//       headers: content.astro?.headers || [],
//       content: content.astro?.html || '',
//       ...otherProps
//     },
//     /** Thumbnail? */
//     ...(content.thumbnail?.path
//       ? {
//           thumbnail: {
//             path: content.thumbnail?.path,
//             width: content.thumbnail?.width ?? undefined,
//             height: content.thumbnail?.height ?? undefined
//           }
//         }
//       : {})
//   };
// }
// export {
//   // isPage,
//   isPageSchema,
//   isPageStatus,
//   isPageContent,
// }

// toPage,
// toPageSummary
