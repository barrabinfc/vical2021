import { buildHTMLTransformerFn } from './buildTransformerFn';

/**
 * Transform video tags into `vjs` instances
 * @deprecated Use MarkdownComponentsHydration instead
 */
export const transformVideoToVJS = buildHTMLTransformerFn('video', (el, ctx) => {
  el.attr('class', [el.attr('class'), 'vicalvideo', 'video-js', 'vjs-default-skin', 'vjs-big-play-centered'].join(' '));
  el.attr(
    'data-setup',
    JSON.stringify({
      aspectRatio: '16:9',
      liveui: true,
      responsive: false
    })
  );
});

export default transformVideoToVJS;
