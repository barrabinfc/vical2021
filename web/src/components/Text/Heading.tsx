import React from 'react';

import { cn, avoidWidowedWords } from '../../lib/helpers';
import { HeadingLevel } from '../../@types/a11y';

export interface HeadingProps {
  HeadingLevel?: HeadingLevel;
  className?: string | string[];
  noWidow?: boolean;
  children: string;
}

export function Heading(props: HeadingProps) {
  const Title = props.HeadingLevel || HeadingLevel.h1;
  const textContent = props.noWidow ? avoidWidowedWords(props.children) : props.children;

  return <Title className={cn(props.className)}>{textContent}</Title>;
}

export default Heading;
