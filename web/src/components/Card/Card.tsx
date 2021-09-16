import React, { useEffect } from 'react';
import { cn, range } from '~/lib/helpers';

import { motion, useAnimation } from 'framer-motion';
import AppearWhenVisible from '../anims/AppearWhenVisible';

import styles from './Card.module.css';
import { useInView } from 'react-intersection-observer';

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
    <motion.a ref={ref} href={href} className={cn(styles.card, className)} whileHover={{ scale: 1.05 }}>
      <motion.div className={cn(styles['content-container'])}>
        <motion.div className={cn(styles['content'])}>
          {avatar && (
            <div className={styles.avatar}>
              <picture>
                <img src={avatar?.path} loading={loading} alt={content?.title || 'A image'} />
              </picture>
            </div>
          )}
          <div className={styles['title-container']} align-at="bottom">
            <motion.h3
              className={styles.title}
              animate={controls}
              initial="hidden"
              transition={{ duration: 0.5 }}
              variants={{
                visible: { y: 0, transition: { delay: delay + 0.15 } },
                hidden: { y: 50 }
              }}
            >
              {content?.title}
            </motion.h3>
            {content?.subtitle && (
              <motion.p
                className={styles.subtitle}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.5 }}
                variants={{
                  visible: { y: 0, transition: { delay: delay + 0.25 } },
                  hidden: { y: 50 }
                }}
              >
                {content?.subtitle}
              </motion.p>
            )}
            {children && children}
          </div>
          <div className="cast-shadow"></div>
        </motion.div>
      </motion.div>
    </motion.a>
  );
}
