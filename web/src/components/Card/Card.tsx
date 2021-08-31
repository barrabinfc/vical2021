import React, {useState} from 'react';
import Link from '~/components/Router/Link';

import {AnimatePresence, AnimateSharedLayout, motion, useMotionValue} from 'framer-motion';

import styles from "./Card.module.css";

import { cn, range } from "~/lib/helpers";
import { springs } from '~/lib/animations';

export interface CardProps {
  href: string,
  avatar: {
    url: string;
    width: number;
    height: number;
  };
  content: {
    title: string;
    description: string;
  },
  className: string|string[],
  loading: 'lazy'|'eager',
}

export default function Card({href, avatar, content, className, loading='lazy'}: CardProps) {
  const avatarWidth = avatar?.width || 280;
  const avatarHeight = avatar?.height || 280;

  return (
    <Link className={cn(styles.card, className)} href={href}>
      <AnimatePresence>
        <motion.div className={cn(styles['content-container'])}>
          <motion.div className={cn(styles['content'])}>
            {avatar &&
              <motion.div layout className={styles.avatar} >
                <picture className="fade-in">
                  <motion.img layout initial={false} src={avatar?.url} loading={loading}
                    alt={content?.title || 'A image'}  />
                </picture>
              </motion.div>
            }
            <motion.div layout="position" className={styles['title-container']} align-at="bottom">
              <h3 className={styles.title}>{content?.title}</h3>
              {content?.description &&
                <p className={styles.description}>{content?.description}</p>
              }
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}
