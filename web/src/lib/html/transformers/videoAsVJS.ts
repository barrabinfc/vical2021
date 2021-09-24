import { buildHTMLTransformerFn } from './buildTransformerFn';

/**
 * Transform video tags into `vjs` instances
 */
export const transformVideoToVJS = buildHTMLTransformerFn('video', (el, ctx) => {
  el.attr('class', [el.attr('class'), 'video-js'].join(' '));
  el.attr('data-setup', '{}');
});

export default transformVideoToVJS;
