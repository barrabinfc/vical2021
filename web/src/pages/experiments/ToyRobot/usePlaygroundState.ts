import { useState, useRef } from 'react';
import { InferType } from 'typanion';
import { useBetween } from 'use-between';

/**
 * Shared reactive state between components
 */
export const usePlaygroundState = () => {
  const [playing, setPlaying] = useState(false);
  const [debug, setDebug] = useState(false);

  return { playing, setPlaying, debug, setDebug };
};
