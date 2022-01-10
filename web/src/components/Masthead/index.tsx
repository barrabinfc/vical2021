import React from 'react';

import { avoidWidowedWords } from '../../lib/helpers';

import styles from './masthead.module.scss';
import { cn, hasReactChildren } from '../../lib/helpers';

export interface InlineImageProps {
  src: string;
  className?: string;
}

function InlineImage({ src, className }: InlineImageProps) {
  console.log(src, className);
  if (src && src.match(/svg/)) {
    return <svg className={cn('logo', styles.logo, className)} data-src={src} color="var(--surface4)"></svg>;
  } else {
    return <img alt="" src={src} className={cn(styles.logo)} />;
  }
}

export interface MastHeadProps {
  title: string;
  subtitle?: string;
  image: InlineImageProps;
  children: React.ReactElement | React.ReactElement[];
  className?: string | string[];
}

/**
 * A masthead of a page
 * (above the folder cover)
 */
export default function MastHead({ title, subtitle, image, children, className }: MastHeadProps) {
  console.log(title, subtitle, image, children, className);
  return (
    <div className={cn(styles.masthead, className, hasReactChildren(children) && styles.variant_withChild)}>
      {image && <InlineImage src={image.src} />}
      <div className={cn(styles.contentContainer, 'content-container')}>
        <div className={cn(styles.content)}>
          <h1 id="masthead-title" className={cn('title', styles.title)}>
            {avoidWidowedWords(title)}
          </h1>
          {subtitle && <h2 className={cn('subtitle', styles.subtitle)}>{avoidWidowedWords(subtitle)}</h2>}
        </div>
        {hasReactChildren(children) && children}
      </div>
    </div>
  );
}
