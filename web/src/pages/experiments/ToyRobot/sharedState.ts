import { useState, useRef } from 'react';
import { useBetween } from 'use-between';

/**
 * Shared reactive state between components
 */
export const useRobotStateRefs = (initialCommands: string) => {
  const commands = useRef(initialCommands);
  const [playing, setPlaying] = useState(false);

  return { commands, playing, setPlaying };
};
