import React from 'react';
import { SEOItem } from '../types';

/**
 * Structured data for a Basic
 * @see https://developers.google.com/search/docs/data-types/article
 *
 */
export default function Basic(
  props: SEOItem,
  metadata: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Website'
  }
) {
  const ldData = {
    ...metadata,

    /** Content */
    headline: props.title ?? '',
    description: props.description ?? '',

    ...(props.content && {
      articleBody: props.content ?? ''
    }),

    /** Thumbnails */
    ...(props.images?.length && {
      image: props.images
    }),

    /** Author */
    ...(props.author && {
      author: {
        '@type': 'Person',
        name: props.author
      }
    }),

    /** Dates */
    ...{
      datePublished: props.datePublished || undefined
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldData, null, 4) }} />;
}
