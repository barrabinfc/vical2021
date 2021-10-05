import React from 'react';
import { cn } from '../../../lib/helpers';

import IpadPro13Image from './ipad-pro-13.png';
import style from './ipadPro13.module.scss';

export const MockupIpadPro13 = (props) => {
  return (
    <div className={cn(style.ipadPro13)}>
      <picture className="mockup-picture">{props.children}</picture>
    </div>
  );
};

export default MockupIpadPro13;
