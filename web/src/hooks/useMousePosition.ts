import { useRef, useEffect } from 'react';

/**
 * Mouse or touch position in viewport coordinates
 *
 * usage:
 *  const mousePosition = useMousePosition();
 *  console.log( mousePosition.current.x );
 */
export const useMousePosition = () => {
  /** Guard against using in non-browsers environment */
  let rootDocument: HTMLElement;
  try {
    rootDocument = document.documentElement;
  } catch {
    throw Error(`useMousePosition can only be used in browsers environment.`);
  }

  let mousePosition = useRef({
    x: 0,
    y: 0
  });

  function onMouseMove(e: MouseEvent) {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }
  function onTouchStart(e: TouchEvent) {
    // e.preventDefault();
    return false;
  }
  function onTouchMove(e: TouchEvent) {
    // e.preventDefault();
    let touch = e.changedTouches[0];
    mousePosition.current = { x: touch.pageX, y: touch.pageY };
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    };
  });

  return mousePosition;
};
