import React, { useEffect } from 'react';
import { HeadingLevel } from '../../@types/a11y';

import { cn } from '../../lib/helpers';

import { motion, useAnimation } from 'framer-motion';

import styles from './Card.module.scss';
import { useInView } from 'react-intersection-observer';

import { openSpring, closeSpring } from '../../lib/animations';

export interface CardProps {
  As?: 'a' | 'div';
  href: string;
  avatar: {
    path?: string;
    alt?: string;
    width: number;
    height: number;
  };
  content: {
    title: string;
    subtitle: string;
    description?: string;
  };
  TitleHeadingLevel?: HeadingLevel;
  className: string | string[];

  children?: React.ReactNode | React.ReactNode[];
  variant?: 'label-bottom';
  loading: 'lazy' | 'eager';

  /** Anim options */
  delay?: number;
}
export type props = CardProps;

export default function Card({
  As = 'a',
  href,
  avatar,
  content,
  TitleHeadingLevel = HeadingLevel.h2,
  className,
  children,
  variant = 'label-bottom',
  loading = 'lazy',
  delay = 0
}: CardProps): JSX.Element {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const inViewTransitionSpeed = 200;
  const inViewTransitionEasing = [];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <As ref={ref} href={href} className={cn('card', styles.card, className)}>
      {avatar && (
        <div className={cn('avatar', styles.avatar)}>
          <picture>
            <img src={avatar?.path} loading={loading} alt={avatar?.alt || ''} />
          </picture>
        </div>
      )}
      <div className={styles['title-container']} data-variant={variant}>
        <TitleHeadingLevel className={cn(styles.title, 'title3')}>
          <motion.div
            animate={controls}
            initial="hidden"
            variants={{
              visible: { y: 0, transition: { delay: delay + 0.15 }, ...openSpring },
              hidden: { y: inViewTransitionSpeed, ...closeSpring }
            }}
          >
            {content?.title}
          </motion.div>
        </TitleHeadingLevel>
        {content?.subtitle && (
          <motion.p
            className={cn(styles.subtitle)}
            animate={controls}
            initial="hidden"
            variants={{
              visible: { y: 0, transition: { delay: delay + 0.25 }, ...openSpring },
              hidden: { y: inViewTransitionSpeed, ...openSpring }
            }}
          >
            {content?.subtitle}
          </motion.p>
        )}
        {children && children}
      </div>
    </As>
  );
}
