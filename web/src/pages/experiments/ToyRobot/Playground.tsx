import React, { useState, useCallback, useRef } from 'react';

import { useBetween } from 'use-between';

import { cn } from '../../../lib/helpers';
import style from './playground.module.scss';

import { RobotCommand, ToyRobot, parseLine } from './ToyRobot';
import Editor from './Editor';
import Canvas from './Canvas';
import { usePlaygroundState } from './usePlaygroundState';
import { useKeyPressedCallback } from '~/hooks/useKeyPressed';

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

/**
 * Playground ToyRobot.
 *
 * Run the robot based on commands of the left.
 * Display the robot on a canvas
 */
export const ToyRobotPlayground = ({ dimensions, code }: { dimensions: [number, number]; code: string }) => {
  const robot = useRef(new ToyRobot({ dimensions }));
  const commands = useRef(code);
  const { playing, setPlaying, debug, setDebug } = usePlaygroundState();

  const debugPlay = () => {
    const robotRunGenerator = robot.current.runStepByStep(commandsGenerator(commands.current));
    let result: any = { done: false };
    console.groupCollapsed('Play');
    do {
      try {
        result = robotRunGenerator.next();
        if (result.value) {
          console.log('Step: ', result.value);
        }
      } catch (e) {
        console.error(`Skipping! ${e.message}`);
        continue;
      }
    } while (!result.done);
    console.groupEnd();
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
  //   console.log('ctrlEnter');
  // };
  // useKeyPressedCallback((ev) => ev.key === 'Enter' && ev.ctrlKey, play);

  return (
    <div className={cn(style.robotPlayground)}>
      <Editor
        className={cn(style.robotEditor)}
        playing={playing}
        debug={debug}
        setDebug={setDebug}
        commands={commands}
        onPlay={play}
        onStop={stop}
      />
      <Canvas className={cn(style.robotCanvas)} dimensions={dimensions} robot={robot.current} debug={debug} />
    </div>
  );
};

export default ToyRobotPlayground;
