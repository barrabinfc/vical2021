import React from 'react';
import { wrapSuspenseLoader } from '../../../components/MarkdownComponentsHydration/wrapSuspenseLoader';

import { MarkdownComponentsHydration } from '../../../components/MarkdownComponentsHydration/MarkdownComponentsHydration';

/**
 * Components available for hydration in projects/
 */
export const ProjectHydrationTransformers = () => {
  const videoComponent = React.lazy(() => import('../../../components/video/video'));
  const videoWithLoading = wrapSuspenseLoader(videoComponent);

  return {
    video: videoWithLoading
  };
};

export default ({ children }) => {
  return (
    <MarkdownComponentsHydration transformers={ProjectHydrationTransformers()}>{children}</MarkdownComponentsHydration>
  );
};
// export default ProjectHydrationTransformers;
