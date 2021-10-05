import React, { lazy, Suspense } from 'react';

import htmr from 'htmr';
// import type { Props } from 'htmr';
import { ErrorBoundary } from 'react-error-boundary';

export interface MarkdownComponentsHydrationProps {
  children: React.ReactElement;
  transformers: Record<string, (props: any) => JSX.Element>;
}

interface HtmrElementProps extends JSX.IntrinsicAttributes {
  is?: string;
}

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

    return (
      <div className="markdown-components-hydration">
        <ErrorBoundary FallbackComponent={errorMsgComponent}>
          {htmr(childHTML, {
            transform: {
              _: (Node, props: HtmrElementProps, children) => {
                /** text node */
                if (typeof props === 'undefined') {
                  return Node;
                }

                /** Enable transform for web-components is=xxx syntax */
                if (props['is'] !== undefined) {
                  const Component = transformers[props['is']];
                  if (Component) {
                    const { is, ...originalProps } = props;
                    return <Component {...originalProps}>{children}</Component>;
                  } else {
                    console.error(
                      `MarkdownComponentsHydration could not find component ${props['is']} for client-side hydration`
                    );
                  }
                }
                return <Node {...props}>{children}</Node>;
              },
              ...transformers
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
