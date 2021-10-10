import React, { useState, useCallback } from 'react';

import { useBetween } from 'use-between';

import { cn } from '../../../lib/helpers';
import style from './playground.module.scss';

import { RobotCommand, ToyRobot } from './ToyRobot';
import Editor from './Editor';
import Canvas from './Canvas';
import { useRobotStateRefs } from './sharedState';
// import { useKeyPressedCallback } from '../../../hooks/useKeyPressed';

function* commandsGenerator(commands: string) {
  const lines = commands.split('\n');
  for (let l of lines) {
    const [command, ...args] = l
      .trim()
      .split(' ')
      .map((p) => p.trim());

    // Skip empty / comments
    if (command !== '' && !command.startsWith('#')) {
      const argsWithoutSpaces = args.filter((a) => a !== ' ');
      yield [command, argsWithoutSpaces] as RobotCommand;
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
  const { commands, playing, setPlaying } = useRobotStateRefs(code);

  /** Play robot commands */
  const play = () => {
    setPlaying(true);
    const robotRunGenerator = robot.runStepByStep(commandsGenerator(commands.current));
    let result: any = { done: false };
    do {
      try {
        result = robotRunGenerator.next();
        if (result.value) {
          console.info('Step: ', result.value);
        }
      } catch (e) {
        console.error(`Skipping! ${e.message}`);
        continue;
      }
      setPlaying(false);
    } while (!result.done);
  };

  /** BUG: This makes the whole component re-render */
  // const onCtrlEnter = () => {
  //   console.log('ctrlEnter');
  // };
  // useKeyPressedCallback((ev) => ev.key === 'Enter' && ev.ctrlKey, play);

  return (
    <div className={cn(style.robotPlayground)}>
      <Editor
        className={cn(style.robotEditor)}
        playing={playing}
        commands={commands}
        onPlay={play}
        onStop={console.log}
      />
      <Canvas className={cn(style.robotCanvas)} robot={robot} />
    </div>
  );
};

export default ToyRobotPlayground;
