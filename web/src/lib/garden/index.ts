import { resolve, relative } from 'path';
import { Page, toPage } from '../page';

/**
 * Fetch all garden posts in the folder 'src/pages/garden'.
 * @return {Page[]}
 * @deprecated
 */
// export const listGarden = async (): Promise<Page[]> => {
//   /** @ts-ignore */
//   const cwd = resolve(`src/pages/garden`);
//   if (!/garden$/.test(cwd)) {
//     throw new Error(`cwd() should be in pages/garden/ folder: ${cwd}`);
//   }

//   const markdownFiles = [...(await listMarkdown(cwd))];
//   const pages = markdownFiles.map((page) => toPage(page, cwd));
//   // .filter(page => page.published);
//   // .sort((pageA, pageB) => pageB.publishedAt - pageA.publishedAt);

//   return pages;
// };
