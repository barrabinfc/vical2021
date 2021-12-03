import React from 'react';
import { SEOItem } from '../types';

import BasicTwitter from './basic';
/**
 * Renders twitter tags
 */
export default function Article(props: SEOItem) {
  return <BasicTwitter {...props} />;
}
