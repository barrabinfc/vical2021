import React, { useState, useCallback } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import debounce from 'lodash.debounce';

import * as RadixToolbar from '@radix-ui/react-toolbar/dist/index.module';
import { IdProvider } from '@radix-ui/react-id';
import { PlayIcon, StopIcon } from '@radix-ui/react-icons';

import { cn } from '../../../lib/helpers';
import style from './playground.module.scss';

import { useRobotStateRefs } from './sharedState';
import { ToyRobot } from './ToyRobot';

interface ToyRobotEditor {
  className?: string;
  commands: React.MutableRefObject<string>;
  playing: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export const Toolbar = ({ playing, onPlay, onStop }: Pick<ToyRobotEditor, 'playing' | 'onPlay' | 'onStop'>) => {
  const togglePlaying = useCallback(() => {
    if (playing) {
      onStop();
    } else {
      onPlay();
    }
  }, [playing]);
  console.log('Toolbar:render');

  return (
    <RadixToolbar.Root aria-label="Toolbar" className={cn(style.editorToolbar)}>
      <RadixToolbar.Separator />
      <RadixToolbar.Button
        className={cn(style.toolbarButton)}
        data-modifier={cn(playing && 'active')}
        style={{ marginLeft: 'auto' }}
        onClick={togglePlaying}
      >
        {playing ? <StopIcon /> : <PlayIcon />}
      </RadixToolbar.Button>
    </RadixToolbar.Root>
  );
};

export const Editor = ({
  defaultCommands,
  commandsRef
}: {
  defaultCommands: string;
  commandsRef: React.MutableRefObject<string>;
}) => {
  const [localCommands, setLocalCommands] = useState(defaultCommands);

  /** Commit commands to shared robot state , debounced */
  let commitCommands = debounce((newCommands: string) => {
    commandsRef.current = newCommands;
  }, 150);
  const updateCommands = useCallback((newCommands: string) => {
    setLocalCommands(newCommands);

    commitCommands(newCommands);
  }, []);

  return (
    <SimpleCodeEditor
      className={cn(style.editorCode)}
      value={localCommands}
      onValueChange={updateCommands}
      highlight={(code) => code}
      padding={10}
      style={{
        height: '100%',
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12
      }}
    />
  );
};

export const ToyRobotEditor = (props: ToyRobotEditor) => {
  const playing = props.playing;
  return (
    <IdProvider>
      <div className={cn(style.editorWrapper, props.className || '')}>
        <Toolbar playing={playing} onPlay={props.onPlay} onStop={props.onStop} />
        <Editor defaultCommands={props.commands.current} commandsRef={props.commands} />
      </div>
    </IdProvider>
  );
};

export default ToyRobotEditor;
