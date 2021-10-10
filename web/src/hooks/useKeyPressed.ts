import { useState, useEffect, useRef, useCallback } from 'react';
import { callbackify } from 'util';

/**
 * useKeyPressed in typescript
 * https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5
 *
 * Usage:
 *  const shouldSubmit = useKeyPressed(
 *   (ev: KeyboardEvent) => (ev.metaKey || ev.ctrlKey) && ev.key === "Enter"
 * );
 *
 * if (shouldSubmit) {
 *   // Do something
 * }
 */
export const useKeyPressed = (keyLookup: (event: KeyboardEvent) => boolean): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (ev: KeyboardEvent) => setKeyPressed(keyLookup(ev));
    const upHandler = (ev: KeyboardEvent) => setKeyPressed(keyLookup(ev));

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keyLookup]);

  return keyPressed;
};

export const useKeyPressedCallback = (
  keyLookup: (event: KeyboardEvent) => boolean,
  cb: (KeyboardEvent) => void
): void => {
  useEffect(() => {
    const downHandler = (ev: KeyboardEvent) => {
      if (keyLookup(ev)) {
        cb(ev);
      }
    };
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [keyLookup]);
};

export default useKeyPressed;
