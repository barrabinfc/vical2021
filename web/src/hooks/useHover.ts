import React, { useEffect, useRef } from 'react';

/**
 * Detect hover of element, by passing a querySelector.
 * Uses a references, instead of state
 * usage:
 *
 *  const hoveredLinksElement = useHover('a[href]')
 */
export function useHover({ selector }: { selector: string }) {
  const hoverRefElement = useRef<Node>();

  const hoverHandler = (ev: Event): void => {
    hoverRefElement.current = ev.currentTarget as Node;
  };
  const hoverOutHandler = (ev: Event): void => {
    hoverRefElement.current = null;
  };

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector));
    elements.forEach((el) => {
      el.addEventListener('pointerover', hoverHandler);
      el.addEventListener('pointerleave', hoverOutHandler);
    });
    return () => {
      elements.forEach((el) => {
        el.removeEventListener('pointerover', hoverHandler);
        el.removeEventListener('pointerleave', hoverHandler);
      });
    };
  });

  return hoverRefElement;
}
