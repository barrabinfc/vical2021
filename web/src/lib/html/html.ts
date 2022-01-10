/**
 * HTML parser helper
 */
import cheerio, { html as cheerioOuterHTML, load, CheerioAPI } from 'cheerio';

/**
 Parse `htmlString` as a fragment
 */
export const loadHTML = (htmlString: string): CheerioAPI => {
  return load(htmlString, null, false);
};

/**
  Get the HTML as string of element `el`

  @example
   html( $('.pear') ) =>
    <div class="pear">...</div>
 */
export const html = cheerioOuterHTML;
