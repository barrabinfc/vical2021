import React, { useEffect } from 'react';
import { cn, range } from '~/lib/helpers';

import { motion, useAnimation } from 'framer-motion';

import styles from './Card.module.css';
import { useInView } from 'react-intersection-observer';

import { openSpring, closeSpring } from '../../lib/animations';

export interface CardProps {
  href: string;
  avatar: {
    path: string;
    width: number;
    height: number;
  };
  content: {
    title: string;
    subtitle: string;
  };
  className: string | string[];
  children?: React.ReactNode | React.ReactNode[];
  loading: 'lazy' | 'eager';

  /** Anim options */
  delay?: number;
}

export default function Card({ href, avatar, content, className, children, loading = 'lazy', delay = 0 }: CardProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.a ref={ref} href={href} className={cn(styles.card, className)} whileHover={{ scale: 1.02 }}>
      <div className={cn(styles['content-container'])}>
        <div className={cn(styles['content'])}>
          {avatar && (
            <div className={styles.avatar}>
              <picture>
                <img src={avatar?.path} loading={loading} alt={content?.title || 'A image'} />
              </picture>
            </div>
          )}
          <div className={styles['title-container']} align-at="bottom">
            <h3 className={cn(styles.title, styles['clamp-line'])}>
              <motion.span
                style={{ position: 'absolute' }}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.5 }}
                variants={{
                  visible: { y: 0, transition: { delay: delay + 0.15 }, ...openSpring },
                  hidden: { y: 50, ...closeSpring }
                }}
              >
                {content?.title}
              </motion.span>
            </h3>
            {content?.subtitle && (
              <p className={cn(styles.subtitle, styles['clamp-line'])}>
                <motion.span
                  style={{ position: 'absolute' }}
                  animate={controls}
                  initial="hidden"
                  transition={{ duration: 0.5 }}
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
    </motion.a>
  );
}
