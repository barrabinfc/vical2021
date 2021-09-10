import { dirname, relative } from "node:path";
import { listMarkdown, toMarkdownPage } from "../../lib/listMarkdown";

const toGardenPage = (
  markdownPage: MarkdownPage,
  gardenPath: string
): GardenPage => {
  const relativePath = relative(gardenPath, dirname(markdownPage.abspath));
  const collections = (relativePath && relativePath.split("/")) || null;
  return {
    ...markdownPage,
    collection: collections
  };
};

/**
 * Fetch all garden posts in the folder 'src/pages/garden'.
 * @return {MarkdownPage[]}
 */
export const listGarden = async (): Promise<MarkdownPage[]> => {
  /** @ts-ignore */
  const cwd = dirname(import.meta?.url?.pathname ?? process.cwd());
  if (!/garden$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/garden/ folder`);
  }

  const markdownFiles = [...(await listMarkdown(cwd))];
  const markdownPages = markdownFiles
    .map(toMarkdownPage)
    .map(page => toGardenPage(page, cwd))
    .filter(page => page.published)
    .sort((pageA, pageB) => pageB.publishedAt - pageA.publishedAt);

  return markdownPages;
};
