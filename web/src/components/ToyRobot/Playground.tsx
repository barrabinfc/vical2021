import React, { useState, useCallback, useRef } from 'react';

// import { useBetween } from 'use-between';

import { cn } from '../../lib/helpers';
import style from './playground.module.scss';

import { RobotCommand, ToyRobot, parseLine } from './ToyRobot';
import Editor from './Editor';
import Canvas from './Canvas';
import { usePlaygroundState } from './usePlaygroundState';
import { useKeyPressedCallback } from '../../hooks/useKeyPressed';

import debug from 'debug';
let log, warn, info, error;
log = warn = info = error = debug('vical:playground.tsx');

function* lineGenerator(commands: string) {
  for (let line of commands.split('\n')) {
    yield line;
  }
}

function* commandsGenerator(commands: string) {
  for (let line of lineGenerator(commands)) {
    const parsed = parseLine(line);
    if (parsed) {
      yield parsed;
    }
  }
}

interface ToyRobotPlaygroundProps {
  dimensions?: [number, number];
  code?: string;
}

/**
 * Playground ToyRobot.
 *
 * Run the robot based on commands of the left.
 * Display the robot on a canvas
 */
export function ToyRobotPlayground(config: ToyRobotPlaygroundProps): JSX.Element {
  const { dimensions = [5, 5] } = config ?? {};
  const { code = '' } = config ?? {};

  const robot = useRef(new ToyRobot({ dimensions }));
  const commands = useRef(code);

  const playgroundState = usePlaygroundState();
  const { playing, setPlaying, debug, setDebug } = playgroundState;

  const debugPlay = () => {
    const robotRunGenerator = robot.current.runStepByStep(commandsGenerator(commands.current));
    let result: any = { done: false };
    log('Play');
    do {
      try {
        result = robotRunGenerator.next();
        if (result.value) {
          log('Step: ', result.value);
        }
      } catch (e) {
        error(`Skipping! ${e.message}`);
        continue;
      }
    } while (!result.done);
  };

  /** Play robot commands */
  const play = () => {
    setPlaying(true);
    if (debug) {
      debugPlay();
    } else {
      robot.current.runAll(commandsGenerator(commands.current));
    }
    setPlaying(false);
  };
  const stop = () => {
    setPlaying(false);
  };

  /** BUG: This makes the whole component re-render... twice */
  // const onCtrlEnter = () => {
  //   log('ctrlEnter');
  // };
  // useKeyPressedCallback((ev) => ev.key === 'Enter' && ev.ctrlKey, play);
  return (
    <div className={cn(style.robotPlayground)}>
      <Editor className={cn(style.robotEditor)} onPlay={play} onStop={stop} {...playgroundState} commands={commands} />
      <Canvas className={cn(style.robotCanvas)} dimensions={dimensions} robot={robot.current} debug={debug} />
    </div>
  );
}

export default ToyRobotPlayground;
