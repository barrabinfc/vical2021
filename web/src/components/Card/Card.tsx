import React, { useEffect } from 'react';
import { HeadingLevel } from '../../@types/a11y';

import { cn } from '~/lib/helpers';

import { motion, useAnimation } from 'framer-motion';

import styles from './Card.module.css';
import { useInView } from 'react-intersection-observer';

import { openSpring, closeSpring } from '../../lib/animations';

export interface CardProps {
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
  };
  TitleHeadingLevel?: HeadingLevel;
  className: string | string[];

  children?: React.ReactNode | React.ReactNode[];
  loading: 'lazy' | 'eager';

  /** Anim options */
  delay?: number;
}

export default function Card({
  href,
  avatar,
  content,
  TitleHeadingLevel = HeadingLevel.h2,
  className,
  children,
  loading = 'lazy',
  delay = 0
}: CardProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <a ref={ref} href={href} className={cn('card', styles.card, className)}>
      <div className={cn(styles['content-container'])}>
        <div className={cn(styles['content'])}>
          {avatar && (
            <div className={cn('avatar', styles.avatar)}>
              <picture>
                <img src={avatar?.path} loading={loading} alt={avatar?.alt || ''} />
              </picture>
            </div>
          )}
          <div className={styles['title-container']} align-at="bottom">
            <TitleHeadingLevel className={cn(styles.title, 'title3', 'line-clamp')}>
              <motion.span
                style={{ position: 'absolute' }}
                animate={controls}
                initial="hidden"
                variants={{
                  visible: { y: 0, transition: { delay: delay + 0.15 }, ...openSpring },
                  hidden: { y: 50, ...closeSpring }
                }}
              >
                {content?.title}
                <span className="visually-hidden">.</span>
              </motion.span>
            </TitleHeadingLevel>
            {content?.subtitle && (
              <p className={cn(styles.subtitle, 'line-clamp')}>
                <motion.span
                  style={{ position: 'absolute' }}
                  animate={controls}
                  initial="hidden"
                  variants={{
                    visible: { y: 0, transition: { delay: delay + 0.25 }, ...openSpring },
                    hidden: { y: 50, ...openSpring }
                  }}
                >
                  {content?.subtitle}
                </motion.span>
              </p>
            )}
            {children && children}
          </div>
          <div className="cast-shadow"></div>
        </div>
      </div>
    </a>
  );
}
