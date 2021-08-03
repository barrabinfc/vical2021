import React, {useState} from 'react';
import Link from '~/components/Router/Link';

import {motion, useMotionValue} from 'framer-motion';

import { cn } from "~/lib/helpers";
import styles from "./Card.module.css";
import { spring } from '~/lib/animations';

export interface CardProps extends Work {
  className: string|string[],
  loading: 'lazy'|'eager'
  expanded?: boolean
}

export default function Card({href, avatar, content, className, loading='lazy'}: CardProps) {
  const avatarWidth = avatar?.width || 280;
  const avatarHeight = avatar?.height || 280;

  const [expanded, setExpanded] = useState(false);
  return (
    <Link className={cn(styles.card, className)} href={href} onEnter={() => setExpanded(exp => !exp)}>
      <div className={cn(styles['content-container'], expanded && 'expanded')} >
        <motion.div layout transition={spring}
          className={cn(styles['content'])}
        >
          {avatar &&
            <motion.div layout transition={spring} className={styles.avatar}>
              <picture className="fade-in">
                <motion.img src={avatar?.url} loading={loading}
                  width={avatarWidth} height={avatarHeight}
                  alt={content?.title || 'A image'}  />
              </picture>
            </motion.div>
          }
          <motion.div layout transition={spring} className={styles['title-container']}>
            <h1 className={styles.title}>{content?.title}</h1>
            {content?.description &&
              <p className={styles.description}>{content?.description}</p>
            }
          </motion.div>
        </motion.div>
      </div>
    </Link>
  );
}
