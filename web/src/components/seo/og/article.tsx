import React from 'react';
import {SEOItem} from '../types';

import OGBasic from './basic';

/**
 * Renders open graph / facebook article
 */
export default function Article(props: SEOItem) {
  return <OGBasic {...props} schema='article' />
}
