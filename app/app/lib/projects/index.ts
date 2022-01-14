import { resolve } from "path";
import { Page } from "../page";
// import { listMarkdown } from '../listMarkdown';

/**
 * Fetch all projects in the folder 'src/pages/projects'.
 * @return {MarkdownPage[]}
 * @deprecated
 */
export const listProjects = async (): // markdownFiles: MarkdownPageReference[]
Promise<Page[]> => {
  /** @ts-ignore */
  const cwd = resolve(`src/pages/projects`);
  if (!/projects$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/projects/ folder`);
  }
  // console.log(`listProjects`, cwd);

  // const markdownFiles = [...(await listMarkdown(cwd))];
  // console.info('import.meta => ', import.meta);
  // const markdownFiles = Astro.fetchContent(cwd);
  // // console.info('markdownFiles =>', markdownFiles);
  // return markdownFiles
  //   .map((page) => toPage(page, cwd))
  //   .filter((markdownPage) => markdownPage.published);
  return [];
};
