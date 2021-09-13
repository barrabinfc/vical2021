import * as t from 'typanion';
import { isSimpleISO8601 } from '../validation/isSimpleISO8601';

/** Page schema (according to @schema.org) */
export const isPageSchema = t.isOneOf([t.isLiteral('article'), t.isLiteral('basic')], { exclusive: true });
export type PageSchema = t.InferType<typeof isPageSchema>;

/** Page status */
export const isPageStatus = t.isOneOf([t.isLiteral('draft'), t.isLiteral('in progress'), t.isLiteral('complete')], {
  exclusive: true
});
export type PageStatus = t.InferType<typeof isPageStatus>;

/** Page content */
export const isPageContent = t.isObject({
  title: t.isString(),
  description: t.isString(),
  props: t.isDict(t.isUnknown()),
  headers: t.isArray(t.isUnknown()),
  content: t.isString()
});
export type PageContent = t.InferType<typeof isPageContent>;

/**
 * Page Entity
 * Every page must have those fields.
 */
export const isPage = t.isObject({
  name: t.isString(),
  abspath: t.isString(),
  slug: t.isString(),
  /** It's inside a folder? */
  collection: t.isArray(t.isString()),

  url: t.isInstanceOf(URL),
  tags: t.isArray(t.isString()),

  schema: isPageSchema,

  layout: t.isString(),
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
});
export type Page = t.InferType<typeof isPage>;
