import React from 'react';

import { LazyMotion, m } from 'framer-motion';

const loadFeatures = () => import('./features.js').then((res) => res.default);

export const LazyMotionLoader = ({ children }) => {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
};
export default LazyMotionLoader;
