import React from 'react';
import videojs from 'video.js';
import { cn } from '~/lib/helpers';

import '../../../public/styles/vjs/vjs.css';
import './video.scss';

interface VideoOptions {
  aspectRatio: string;
  liveui: boolean;
  responsive: boolean;
}

type VideoProps = React.PropsWithChildren<{
  width?: string;
  height?: string;
  controls?: boolean;
  preload?: string;
  poster: string;
  className: string;
  'data-setup'?: VideoOptions;
}>;

const defaultVideoOptions: VideoOptions = {
  aspectRatio: '640:640',
  liveui: true,
  responsive: false
};

/**
 * A single video player instance
 */
export const video = ({
  width,
  height,
  controls = true,
  preload = 'none',
  poster,
  className,
  children,
  'data-setup': dataSetup = defaultVideoOptions
}: VideoProps) => {
  /** @ts-ignore */
  if (import.meta.env.SSR) {
    throw new Error('components/video should only be used in client-side');
  }

  const videoRef = React.useRef(null);
  const player = React.useRef<any>(null);

  React.useEffect(() => {
    player.current = videojs(videoRef.current, dataSetup);

    return () => {
      player.current.dispose();
    };
  });

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      controls={controls}
      poster={poster}
      preload={preload}
      className={cn('video-js', className)}
    >
      {children}
    </video>
  );
};

export default video;
