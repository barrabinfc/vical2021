import React from 'react';
import {cn} from '~/lib/helpers';

interface LinkProps {
  href: string,
  className?: string,
  target?: '_blank'|'_self'|'_parent'|'_top'|string,
  children?: React.ReactNode,
  onEnter?: (from: string, to: string) => void,
  onLeave?: (from: string, to: string) => void
}

export default function Link({href, className, target, onEnter, onLeave, children}: LinkProps) {
  function onClick(e){
    e.preventDefault()
    if(onEnter) {
      onEnter(window.location.href, href);
    }
  }

  function filterKeyPress(e, key='enter'): boolean {
    return (e.key === key);
  }

  return (<a href={href} className={cn(className)} target={target || '_self'}
    onClick={onClick}
    onKeyDown={(e) => (filterKeyPress(e,'enter') && onClick(e))}>
    {children}
  </a>)
}
