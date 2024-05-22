import React, { lazy, Suspense } from 'react';

import ContentLoader from 'react-content-loader';

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

/**
 * Wrap a component into a Loading wrapper using <Suspense>
 *
 * @usage
 *  const MyComponent = wrapLoadingComponent( MyComponent )
 *  return <div><MyComponent width={120} height='inherit' /></div>
 */
export const wrapSuspenseLoader = (LazyComponent: React.LazyExoticComponent<any>) => {
  return (props) => {
    const { width, height } = props;

    return (
      <Suspense fallback={<Loader {...props} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default wrapSuspenseLoader;
