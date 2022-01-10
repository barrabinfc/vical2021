import React from 'react';

import { cn } from '../../lib/helpers';

export interface InlineTextProps {
  className?: string | string[];
  children: React.ReactElement;
}

export function InlineText(props: InlineTextProps) {
  return <span className={cn(props.className)}>{props.children}</span>;
}

export default InlineText;
