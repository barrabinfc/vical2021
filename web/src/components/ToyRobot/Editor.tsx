import React, { useState, useCallback } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import debounce from 'lodash.debounce';

import { IdProvider } from '@radix-ui/react-id';
import { PlayIcon, StopIcon, Crosshair2Icon } from '@radix-ui/react-icons';

import * as RToolbar from '@radix-ui/react-toolbar/dist/index.module';
// import * as RTooltip from '@radix-ui/react-tooltip';

import { cn } from '../../lib/helpers';
import style from './playground.module.scss';

interface ToyRobotEditor {
  className?: string;
  commands: React.MutableRefObject<string>;
  playing: boolean;
  debug: boolean;
  setDebug: (value: React.SetStateAction<boolean>) => void;
  onPlay: () => void;
  onStop: () => void;
}

export const Toolbar = ({ playing, onPlay, onStop, debug, setDebug }: Omit<ToyRobotEditor, 'commands'>) => {
  const togglePlaying = useCallback(() => {
    if (playing) {
      onStop();
    } else {
      onPlay();
    }
  }, [playing, onPlay, onStop]);
  const toggleDebug = useCallback(() => {
    // Radix returns '' or true, so we cast by hand (ugly, but readable)
    const inverse = debug === true ? false : true;
    setDebug(inverse);
  }, [debug]);

  return (
    <RToolbar.Root aria-label="Toolbar" className={cn(style.editorToolbar)}>
      <RToolbar.ToggleGroup type="single" aria-label="Debug" onValueChange={toggleDebug}>
        <RToolbar.ToggleItem className={cn(style.toolbarButton)} value={true} aria-label="Debug">
          <Crosshair2Icon />
        </RToolbar.ToggleItem>

        {/* <RTooltip.Root> */}
        {/* <RTooltip.Trigger></RTooltip.Trigger> */}
        {/* <RTooltip.Content> */}
        {/* <span>Coisa</span> */}
        {/* </RTooltip.Content> */}
        {/* </RTooltip.Root> */}
      </RToolbar.ToggleGroup>

      <RToolbar.ToggleGroup
        type="single"
        aria-label="Play"
        style={{ marginLeft: 'auto' }}
        onValueChange={togglePlaying}
        value={playing}
      >
        <RToolbar.ToggleItem className={cn(style.toolbarButton)} value={true}>
          {playing ? <StopIcon /> : <PlayIcon />}
        </RToolbar.ToggleItem>
      </RToolbar.ToggleGroup>
    </RToolbar.Root>
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
        <Toolbar
          playing={playing}
          onPlay={props.onPlay}
          onStop={props.onStop}
          debug={props.debug}
          setDebug={props.setDebug}
        />
        <Editor defaultCommands={props.commands.current} commandsRef={props.commands} />
      </div>
    </IdProvider>
  );
};

export default ToyRobotEditor;
