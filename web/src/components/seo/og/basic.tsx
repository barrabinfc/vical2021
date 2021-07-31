import React from 'react';
import {SEOItem} from '../types';

/**
 * Renders open graph / facebook tags
 */
export default function Basic(props: SEOItem) {
  const ogType = (props.schema === 'basic' && 'website' || props.schema);
  return (<>
    <meta property="og:type" content={ogType} />
    {props.permalink && <meta property="og:url" content={props.permalink} /> }
    {props.title && <meta property="og:title" content={props.title} /> }
    {props.description && <meta property="og:description" content={props.description} /> }
    {props.images?.length && <meta property="og:image" content={props.images[0]} /> }

    {props.author && (
      <meta property="og:author" content={props.author.name} />
    )}
  </>);
}
