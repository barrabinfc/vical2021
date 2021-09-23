import React from 'react';

import { avoidWidowedWords } from '../../lib/helpers';

import styles from './masthead.module.scss';
import { cn, hasReactChildren } from '~/lib/helpers';

function InlineImage({ src, className }: { src: string; className?: string }) {
  if (src.match(/svg/)) {
    return <svg className={cn('logo', styles.logo, className)} data-src={src} color="var(--surface4)"></svg>;
  } else {
    <img alt="" src={src} className={cn(styles.logo)} />;
  }
}

/**
 * A masthead of a page
 * (above the folder cover)
 */
export default function MastHead({ title, subtitle = undefined, image = undefined, children = undefined, className }) {
  return (
    <div className={cn(styles.masthead, className, hasReactChildren(children) && styles.variant_withChild)}>
      {image && <InlineImage src={image} />}
      <div className={cn(styles.contentContainer, 'content-container')}>
        <div className={cn(styles.content)}>
          <h1 id="masthead-title" className={cn(styles.title)}>
            {avoidWidowedWords(title)}
          </h1>
          {subtitle && <h2 className={cn(styles.subtitle)}>{avoidWidowedWords(subtitle)}</h2>}
        </div>
        {hasReactChildren(children) && children}
      </div>
    </div>
  );
}
