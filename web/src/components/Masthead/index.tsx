import React from 'react';

import { avoidWidowedWords } from '../../lib/helpers';

import styles from './masthead.module.scss';
import { cn, hasReactChildren } from '~/lib/helpers';

function InlineImage({ src, alt }: { src: string; alt: string }) {
  if (src.match(/svg/)) {
    return <svg className={cn(styles.logo)} data-src={src} width="76" color="var(--surface4)"></svg>;
  } else {
    <img alt={alt} src={src} className={cn(styles.logo)} />;
  }
}

export default function MastHead({ title, subtitle = undefined, image = undefined, children = undefined, className }) {
  return (
    <div className={cn(styles.masthead, className, hasReactChildren(children) && styles.hasChildrenVariant)}>
      <div className={cn(styles.contentContainer, 'content-container')}>
        {image && <InlineImage src={image} alt={title} />}
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
