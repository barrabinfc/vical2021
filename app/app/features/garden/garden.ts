import { resolve } from "path";
import { readFile } from "fs/promises";

import { getMatchingFiles } from "~/lib/fs";
import { Page } from "~/lib/page";
import { parse as parseMarkdown, MDOutput } from "~/lib/md";

export const GARDEN_POSTS_FOLDER = resolve(process.cwd(), "posts/garden");

export async function getGardenPosts(): Promise<string[]> {
  return await getMatchingFiles(GARDEN_POSTS_FOLDER, [/\.mdx?$/]);
}

/**
 * Retrieve a single Post indicated by `slug` from filesystem
 *
 * @throws {Error}
 */
export async function getGardenPost<T = Page>(
  slug: string
): Promise<MDOutput<T>> {
  /**
   * Matches the slug with filename
   */
  const slugFilenameMatcher = new RegExp(slug.toLowerCase() + ".mdx?$", "gmi");
  const files = await getMatchingFiles(GARDEN_POSTS_FOLDER, [
    slugFilenameMatcher,
  ]);

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
