import React from 'react';
import { wrapSuspenseLoader } from '../../../components/MarkdownComponentsHydration/wrapSuspenseLoader';

import { MarkdownComponentsHydration } from '../../../components/MarkdownComponentsHydration/MarkdownComponentsHydration';

/**
 * Components available for hydration in projects/
 */
export const ProjectHydrationTransformers = () => {
  const videoComponent = React.lazy(() => import('../../../components/video/video'));
  const tagComponent = React.lazy(() => import('../../../components/Tag/Tag'));
  const ipadMockupComponent = React.lazy(() => import('../../../components/Mockups/Tablet/IpadPro13'));
  const iphoneMockupComponent = React.lazy(() => import('../../../components/Mockups/Phone/IphoneX'));

  const videoWithLoading = wrapSuspenseLoader(videoComponent);
  const tagWithLoading = wrapSuspenseLoader(tagComponent);
  const ipadMockupWithLoading = wrapSuspenseLoader(ipadMockupComponent);
  const iphoneMockupWithLoading = wrapSuspenseLoader(iphoneMockupComponent);

  return {
    video: videoWithLoading,
    tag: tagWithLoading,
    ipadMockup: ipadMockupWithLoading,
    iphoneMockup: iphoneMockupWithLoading
  };
};

export default ({ children }) => {
  return (
    <MarkdownComponentsHydration transformers={ProjectHydrationTransformers()}>{children}</MarkdownComponentsHydration>
  );
};
