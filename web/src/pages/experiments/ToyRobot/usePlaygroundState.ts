import { useState, useRef } from 'react';
import { InferType } from 'typanion';
import { useBetween } from 'use-between';

/**
 * Shared reactive state between components
 */
export const usePlaygroundState = (initialCommands: string) => {
  const commands = useRef(initialCommands);
  const [playing, setPlaying] = useState(false);
  const [debug, setDebug] = useState(false);

  return { commands, playing, setPlaying, debug, setDebug };
};
