import React from 'react';
import { cn } from '../../../lib/helpers';

import style from './IpadPro13.module.scss';

export const MockupIpadPro13 = (props) => {
  return (
    <div className={cn(style.ipadPro13)}>
      <picture className="mockup-picture">{props.children}</picture>
    </div>
  );
};

export default MockupIpadPro13;
