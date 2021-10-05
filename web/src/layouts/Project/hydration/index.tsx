import React from 'react';
import { wrapSuspenseLoader } from '../../../components/MarkdownComponentsHydration/wrapSuspenseLoader';

import { MarkdownComponentsHydration } from '../../../components/MarkdownComponentsHydration/MarkdownComponentsHydration';

/**
 * Components available for hydration in projects/
 */
export const ProjectHydrationTransformers = () => {
  const videoComponent = React.lazy(() => import('../../../components/video/video'));
  const tagComponent = React.lazy(() => import('../../../components/Tag/Tag'));

  const videoWithLoading = wrapSuspenseLoader(videoComponent);
  const tagWithLoading = wrapSuspenseLoader(tagComponent);

  return {
    video: videoWithLoading,
    tag: tagWithLoading
  };
};

export default ({ children }) => {
  return (
    <MarkdownComponentsHydration transformers={ProjectHydrationTransformers()}>{children}</MarkdownComponentsHydration>
  );
};
