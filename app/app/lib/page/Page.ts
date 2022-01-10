import { dirname, relative, basename } from 'path';
import * as t from 'typanion';
import { CustomError } from '../errors';
import { slugifyFilepath } from '../helpers';
import { isSimpleISO8601 } from '../validation/isSimpleISO8601';
import { abspathOfPages, pagePathToUrl, urlToPagePath } from './pagePathToUrl';

/**
 * Interface of a raw astro page (Astro.props.content)
 * It contains the properties of a page, it's props and markdown result.
 */
interface AstroPage {
  /** rendered markdown content */
  astro: {
    headers: string[];
    source: string;
    html: string;
  };
  /** Frontmatter */
  [k: string]: any;
}

/** A markdown page from Astro.fetchContent("") */
interface MarkdownPageReference extends AstroPage {
  file: URL;
}

/**
 * Page schema, according to schema.org
 * @see https://schema.org Schema.org
 */
const isPageSchema = t.isOneOf([t.isLiteral('article'), t.isLiteral('basic')], { exclusive: true });
type PageSchema = t.InferType<typeof isPageSchema>;

/** Page status */
const isPageStatus = t.isOneOf([t.isLiteral('draft'), t.isLiteral('in progress'), t.isLiteral('complete')], {
  exclusive: true
});
type PageStatus = t.InferType<typeof isPageStatus>;

/** Page content */
const isPageContent = t.isPartial({
  title: t.isString(),
  subtitle: t.isString(),
  description: t.isString(),
  headers: t.isArray(t.isUnknown()),
  content: t.isString()
  // html: t.isString()
});
type PageContent = Required<t.InferType<typeof isPageContent>>;

/**
 * Page Entity
 * Every page must have those fields.
 */
const pageProps = {
  name: t.isString(),
  abspath: t.isString(),
  slug: t.isString(),

  /** It's inside a folder? */
  collection: t.isArray(t.isString()),

  url: t.isInstanceOf(URL),
  tags: t.isArray(t.isString()),

  layout: t.isString(),

  schema: isPageSchema,
  status: isPageStatus,

  published: t.isBoolean(),
  publishedAt: t.isDate(),

  /** Page content */
  content: isPageContent,

  /** Page thumbnail */
  thumbnail: t.isOptional(
    t.isObject(
      {
        path: t.isString(),
        width: t.isOptional(t.isNumber()),
        height: t.isOptional(t.isNumber())
      },
      {
        extra: t.isUnknown()
      }
    )
  )
};
export const props = pageProps;
const isPage = t.isObject(pageProps);
type Page = t.InferType<typeof isPage>;

/**
 * A page summary, without content.
 * Useful for hydration, since it will only have the required
 * fields for displaying a preview/link of a page.
 */
interface PageSummary {
  name: string;
  url: Page['url'];
  slug: Page['slug'];
  status: Page['status'];
  publishedAt: Page['publishedAt'];
  content: {
    title: Page['content']['title'];
    subtitle: Page['content']['subtitle'];
  };
  thumbnail: Page['thumbnail'];
  tags: Page['tags'];
  collection?: Page['collection'];
}

/**
 * Convert a Page to a Page summary
 */
const toPageSummary = (page: MarkdownPageReference): PageSummary => {
  let name, slug, abspath, relativePath, collection;

  /** MarkdownPageReference */
  abspath = urlToPagePath(page.file);

  name = basename(abspath);
  relativePath = relative(abspathOfPages, dirname(abspath));

  /** Transform from  url.com/path/filename into a url friendly slug  */
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

/**
 * Convert to Page interface
 */
function toPage(content: MarkdownPageReference, cwd?: string): Page;
function toPage(content: AstroPage, cwd?: string): Page {
  let name, slug, abspath, relativePath, collection;

  /** Transform from  url.com/path/filename into a url friendly slug  */
  abspath = urlToPagePath(content.url);
  name = basename(abspath);
  slug = slugifyFilepath(name.replace(/\.\w*?$/g, ''));

  relativePath = relative(abspathOfPages, dirname(abspath));
  collection = (relativePath && relativePath.split('/')) || [];

  /** Get all other properties(frontmatter) that is not reserved  */
  const reservedProps = ['astro', ...Object.keys(pageProps)];
  const otherProps = Object.fromEntries(Object.entries(content).filter(([key, v]) => !reservedProps.includes(key)));

  return {
    name,
    abspath,
    slug,
    collection,
    url: pagePathToUrl(abspath),
    tags: content?.tags || [],
    layout: content?.layout,
    schema: content?.schema,
    status: content?.status,
    published: content?.published,
    publishedAt: new Date(content?.publishedAt),
    content: {
      title: content?.title,
      subtitle: content?.subtitle,
      description: content?.description,
      headers: content.astro?.headers || [],
      content: content.astro?.html || '',
      ...otherProps
    },
    /** Thumbnail? */
    ...(content.thumbnail?.path
      ? {
          thumbnail: {
            path: content.thumbnail?.path,
            width: content.thumbnail?.width ?? undefined,
            height: content.thumbnail?.height ?? undefined
          }
        }
      : {})
  };
}
export type {
  AstroPage,
  MarkdownPageReference,
  Page,
  PageSummary,
  PageSchema,
  PageStatus,
  PageContent,
}
export {
  isPage,
  isPageSchema,
  isPageStatus,
  isPageContent,
  toPage,
  toPageSummary
};
