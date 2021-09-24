import React from 'react';
import videojs from 'video.js';

import '../../../public/styles/vjs/vjs.css';
import './video.scss';

/**
 * A single video player instance
 */
export const video = () => {
  const videoInstanceStaticDOM = () => {
    return <span>Not implemented</span>;
  };

  /** SSR guard-rail */
  try {
    videojs(document.querySelector('.video-js'));
  } catch (e) {
    return videoInstanceStaticDOM();
  }

  return videoInstanceStaticDOM();
};

export default video;
