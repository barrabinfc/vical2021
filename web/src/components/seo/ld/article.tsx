// import {SEOItem} from '../types';
import React from 'react';
import { SEOItem } from '../types';

import BasicLD from './basic';

/**
 * Structured data for a article
 * @see https://developers.google.com/search/docs/data-types/article
 *
 */
export default function Article(props: SEOItem) {
  const metadata = {
    '@context': 'https://schema.org',
    '@type': 'Article'
  };
  return BasicLD(props, metadata);
}
