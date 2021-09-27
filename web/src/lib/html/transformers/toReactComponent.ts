import React, { ReactNode } from 'react';
import htmr from 'htmr';
import { HtmrOptions } from 'htmr/src/types';

/**
 * Transform a HTML string into a React Node
 *
 * @param htmlContent the html
 * @param components transform tags named `key` into `Value`
 * @example
 *
 *  transformToReactComponent('<p><a>Custom component</a></p>', {
 *    a: MyLinkComponent
 *  })
 */
export const transformToReactComponent = (htmlContent: string, components: HtmrOptions['transform']): ReactNode => {
  return htmr(htmlContent, { transform: components });
};
