/**
 * A blog post
 */
import { resolve } from "path";
import "process";

import { getMatchingFiles } from "~/lib/fs";
import { readFile } from "fs/promises";
import { parse as parseMarkdown, MDOutput } from "~/lib/md";

import { Page } from "~/lib/page/Page";
import { ValidationState } from "typanion";
import { LoaderFunction } from "remix";

/** #9900AA configuration #9900AA */
export const POSTS_FOLDER = resolve(process.cwd(), "posts");
/** #9900AA configuration #9900AA */

export type PostReference = {
  filename: string;
  slug: string;
  url: string;
};

/**
 * Get all posts under POSTS_FOLDER
 */
export async function getPosts(): Promise<string[]> {
  return await getMatchingFiles(POSTS_FOLDER, [/\.mdx?$/]);
}

/**
 * Get all posts from the filesystem posts folder
 */
export async function getMarkdownPosts(): Promise<string[]> {
  return await getMatchingFiles(POSTS_FOLDER, [/\.mdx?$/g]);
}

/**
 * Retrieve a single Post indicated by `slug` from filesystem
 *
 * @throws {Error}
 */
export async function getPost<T = Page>(slug: string): Promise<MDOutput<T>> {
  /**
   * Matches the slug with filename
   */
  const slugFilenameMatcher = new RegExp(slug.toLowerCase() + ".mdx?$", "gmi");
  const files = await getMatchingFiles(POSTS_FOLDER, [slugFilenameMatcher]);

  if (!files.length) {
    throw new Error(`No post found for slug: ${slug}`);
  }
  const filePath = files[0];
  const content = await readFile(filePath, "utf8");

  return parseMarkdown<T>({
    filename: filePath,
    body: content.toString(),
  });
}

/**
 * Will try to validate a markdown file.
 * 1. Is it a markdown file? Can we parse it?
 * 2. Apply validation for schema T?
 */
export async function validateMarkdown<T = {}>({
  filename,
  body,
  schemaFn,
}: {
  filename: string;
  body: string;
  schemaFn?: (wherever: any, test?: ValidationState) => boolean;
}): Promise<true | Error> {
  try {
    const md = await parseMarkdown<T>({
      filename,
      body,
    });
    if (schemaFn) {
      const errors: string[] = [];
      const validated = schemaFn(md, { errors });
      return (
        validated ||
        SyntaxError(
          [`Not a valid schema ${schemaFn.name}:`, ...errors].join("\n")
        )
      );
    }
    return true;
  } catch (e) {
    return e as Error;
  }
}
