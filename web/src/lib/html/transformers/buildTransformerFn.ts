import { loadHTML, html } from '../html';
import { Cheerio, Node } from 'cheerio';
import * as cheerio from 'cheerio';

export type HTMLTransformFn = (el: Cheerio<Node>, ctx: any) => void;

/**
  Create a function that will transform HTML elements that match `selector`
  by calling `transformFn(el,context)`

  @param selector The CSS Selector to find elements
  @param transformFn Your transform function
  @param context? Your context to be available to `transformFn` second argument.

  @returns A function to apply with a html string
  @example

  const resolveFn = (el, resolve) => {
    p.attr('src', resolve(p.attr('src').slice(1), page.abspath) )
  }
  const resolveImgPaths = buildTransformer( 'img[src^="./"]', resolveFn , {resolve: Astro.resolve})
  resolveImgPaths('<img src="...">');

 */
export const buildHTMLTransformerFn = (
  selector: string,
  resolveFn: (el: Cheerio<Node>, ctx: any) => void,
  context?: any
): ((html: string) => string) => {
  // console.log(cheerio);
  return (htmlString: string) => {
    let $ = loadHTML(htmlString);
    const elements = $(selector);

    elements.map((i, elStr) => {
      // console.log(`element ${i}`, elStr, resolveFn);
      const el = $(elStr);
      resolveFn(el, context);
    });
    return $.html();
  };
};
