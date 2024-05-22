import React from 'react';

import { cn, avoidWidowedWords } from '../../lib/helpers';

export interface BlockTextProps {
  className?: string | string[];
  noWidow: boolean;
  children: React.ReactElement;
}

export function BlockText({ className, noWidow = false, children }: BlockTextProps) {
  return <span className={cn(className)}>{children}</span>;
}

export default BlockText;
