import { buildHTMLTransformerFn } from './buildTransformerFn';

/**
 * Open links in new page
 */
export const transformFootnoteLinks = buildHTMLTransformerFn('a:not([href^="/"])', (el, ctx) => {
  el.attr('target', '_blank');
  el.attr('rel', 'noopener noreferrer');
});

export default transformFootnoteLinks;
