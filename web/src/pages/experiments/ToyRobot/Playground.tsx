import React, { useState, useCallback } from 'react';

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
  const robot = new ToyRobot({ dimensions });
  const { commands, playing, setPlaying, debug, setDebug } = usePlaygroundState(code);

  const debugPlay = useCallback(() => {
    const robotRunGenerator = robot.runStepByStep(commandsGenerator(commands.current));
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
  }, [commands.current]);

  /** Play robot commands */
  const play = () => {
    console.log('play', debug);
    setPlaying(true);
    if (debug) {
      debugPlay();
    } else {
      robot.runAll(commandsGenerator(commands.current));
    }
    setPlaying(false);
  };
  const stop = useCallback(() => {
    setPlaying(false);
  }, []);

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
      <Canvas className={cn(style.robotCanvas)} robot={robot} debug={debug} dimensions={dimensions} />
    </div>
  );
};

export default ToyRobotPlayground;
