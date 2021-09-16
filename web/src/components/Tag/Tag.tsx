import React from 'react';

import styles from './Tag.module.scss';
import { cn } from '~/lib/helpers';

export enum TagVariant {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  TRANSPARENT = 'transparent'
}
export interface TagProps {
  children?: React.ReactNode;
  className?: string | string[];
  variant?: TagVariant;
  [key: string]: any;
}

/**
 * A simple tag component
 */
export const Tag = ({ className, children, variant = TagVariant.DEFAULT, ...attrs }: TagProps) => {
  return (
    <dfn className={cn(styles.tag, styles[variant], className)} {...attrs}>
      {children}
    </dfn>
  );
};

export default Tag;
