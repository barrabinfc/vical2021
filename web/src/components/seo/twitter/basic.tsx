import React from 'react';
import { SEOItem } from '../types';

/**
 * Renders open graph / facebook tags
 * @param {SEOItem} props
 */
export default function Basic(props) {
  const cardType = props.images?.length > 0 ? 'summary_large_image' : 'summary';
  return (
    <>
      <meta property="twitter:card" content={cardType} />
      {props.permalink && <meta property="twitter:url" content={props.permalink} />}
      {props.title && <meta property="twitter:title" content={props.title} />}
      {props.description && <meta property="twitter:description" content={props.description} />}
      {props.images?.length > 0 && <meta property="twitter:image" content={props.images[0]} />}
    </>
  );
}
