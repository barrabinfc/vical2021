import { ReactNode } from 'react';

import { transformVideoToVJS } from '../../../lib/html/transformers/videoAsVJS';
import { transformAstroEscapeLeft } from '../../../lib/html/transformers/astroCode';
import { transformToReactComponent } from '../../../lib/html/transformers/toReactComponent';

// import Video from '../../../components/video/video';

/**
 * Progressive enhancement of the markdown content
 * of projects.
 */
export const ProjectPostprocessor = (content: string): string | ReactNode => {
  let transformedContent = transformVideoToVJS(content);
  transformedContent = transformAstroEscapeLeft(transformedContent);

  return transformedContent;
};

export default ProjectPostprocessor;
