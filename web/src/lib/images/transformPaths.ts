import { loadHTML, html } from '../html/html';
import cheerio from 'cheerio';

/**
 * Transform relative images path into absolute images path available to astro
 * @param {string} path - The path to find the images
 */
export const transformRelativeImages2Absolute = async (
  htmlString: string,
  path: string,
  resolve: (p: string) => string
): Promise<string> => {
  let $ = loadHTML(htmlString);
  const imgElements = $('img[src^="./"]');

  await Promise.all(
    imgElements.map(async (i, el) => {
      const imgSrc = $(el).attr('src');
      const v = './widow-example.png';
      // @ts-ignore
      const imgModule = resolve('../' + v);
      console.log('imgModule', imgModule);
      const img = cheerio(el);
      img.attr('src', imgModule);
    })
  );

  return $.html();
};
