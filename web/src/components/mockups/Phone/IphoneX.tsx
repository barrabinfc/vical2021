import React from 'react';
import { cn } from '../../../lib/helpers';

import style from './IphoneX.module.scss';

export const MockupIphoneX = (props) => {
  return (
    <div className={cn(style.iphoneX)}>
      <picture className="mockup-picture">{props.children}</picture>
    </div>
  );
};

export default MockupIphoneX;
