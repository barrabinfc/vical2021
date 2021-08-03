import React, {useState} from 'react';
import Link from '~/components/Router/Link';

import {AnimatePresence, AnimateSharedLayout, motion, useMotionValue} from 'framer-motion';

import { cn, range } from "~/lib/helpers";
import styles from "./Card.module.css";
import { springs } from '~/lib/animations';
import { useEffect } from 'react';

export interface CardProps extends Work {
  className: string|string[],
  loading: 'lazy'|'eager'
  expanded?: boolean
}

const placeholderVariants = {
  visible: {opacity: 1},
  hidden: {opacity: 0}
}

export default function Card({href, avatar, content, className, loading='lazy'}: CardProps) {
  const avatarWidth = avatar?.width || 280;
  const avatarHeight = avatar?.height || 280;

  const [expanded, setExpanded] = useState(false);
  const [placeholderVisibility, setPlaceholderVisibility] = useState(false);
  const zIndex = useMotionValue(expanded ? 2 : 0);

  const delay = 150;
  function toggleExpand() {
    if(expanded) {
      setPlaceholderVisibility(false);
      setTimeout(() => setExpanded(false), delay);
      setTimeout(() => zIndex.set(0), delay*3)
    } else {
      zIndex.set(1);
      setExpanded(true);
      setTimeout(() => setPlaceholderVisibility(true), delay);
    }
  }

  return (
    <Link className={cn(styles.card, className)} href={href} onEnter={toggleExpand}>
      <AnimateSharedLayout>
        <motion.div layout
          transition={expanded ? springs.openSpring : springs.closeSpring}
          style={{zIndex}}
          className={cn(styles['content-container'], expanded && 'expanded')}
        >
          <motion.div className={cn(styles['content'])}>
            {avatar &&
              <motion.div layout className={styles.avatar} >
                <picture className="fade-in">
                  <motion.img layout initial={false} src={avatar?.url} loading={loading}
                    // width={avatarWidth} height={avatarHeight}
                    alt={content?.title || 'A image'}  />
                </picture>
              </motion.div>
            }
            <motion.div layout="position" className={styles['title-container']}>
              <h1 className={styles.title}>{content?.title}</h1>
              {content?.description &&
                <p className={styles.description}>{content?.description}</p>
              }
            </motion.div>
            <AnimatePresence>
              {placeholderVisibility && (
                <motion.div
                  variants={placeholderVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  className={styles['content-placeholder']}>
                    {range(3).map( (i) => (
                      <div className="paragraph" key={i}>
                        {range(12+Math.random()*4).map((i) => (<div key={i}></div>))}
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimateSharedLayout>
    </Link>
  );
}
