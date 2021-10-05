import React, { lazy, Suspense } from 'react';

import htmr from 'htmr';
import { ErrorBoundary } from 'react-error-boundary';
import ContentLoader from 'react-content-loader';

export interface MarkdownComponentsHydrationProps {
  children: React.ReactElement;
  transformers: Record<string, () => React.ReactElement>;
}

const Loader = (props) => (
  <ContentLoader
    speed={4}
    viewBox={`0 0 400 150`}
    preserveAspectRatio="xMinYMin slice"
    backgroundColor="transparent"
    foregroundColor="#cfcfcf"
    {...props}
  >
    <rect x="0" y="0" width="400" height={150} />
  </ContentLoader>
);

const wrapLoadingComponent = (LazyComponent: React.LazyExoticComponent<any>) => {
  return (props) => {
    const { width, height } = props;

    return (
      <Suspense fallback={<Loader {...props} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

/**
 * Hydrate components from a htmlString
 *
 * @param htmlContent the html
 * @param transformers transform nodes named `key` into `Value` component
 * @example
 *
 * MarkdownComponentsHydration({children: '<p><a>Custom component</a></p>', transformers: {
 *    a: MyLinkComponent
 * })
 *
 * <MarkdownComponentsHydration transformers={}>
 *    <p><a>My custom link</a></p>
 * </MarkdownComponentsHydration>
 */
export const MarkdownComponentsHydration = ({ children, transformers }: MarkdownComponentsHydrationProps) => {
  const errorMsgComponent = () => <h1 className="error">Error</h1>;
  try {
    /** @ts-ignore */
    if (import.meta.env.SSR) {
      throw new Error('render static plz');
    }

    const childHTML = children.props.value;

    const videoComponent = React.lazy(() => import('../../components/video/video'));
    const videoWithLoading = wrapLoadingComponent(videoComponent);

    return (
      <div className="markdown-components-hydration">
        <ErrorBoundary FallbackComponent={errorMsgComponent}>
          {htmr(childHTML, {
            transform: {
              video: videoWithLoading
            }
          })}
        </ErrorBoundary>
      </div>
    );
  } catch (e) {
    return (
      <div className="markdown-components-hydration">
        <ErrorBoundary FallbackComponent={errorMsgComponent}>{children}</ErrorBoundary>
      </div>
    );
  }
};

export default MarkdownComponentsHydration;
