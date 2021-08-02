import React from 'react';

import { cn } from "~/lib/helpers";
import styles from "./Card.module.css";

export interface CardProps extends Work {
  className: string|string[],
  loading: 'lazy'|'eager'
}

export default function Card({href, avatar, content, className, loading='lazy'}: CardProps) {
  const avatarWidth = avatar?.width || 280;
  const avatarHeight = avatar?.height || 280;

  return (
    <a className={cn(styles.card, className)} href={href}>
      {avatar &&
        <div className={styles.avatar}>
          <picture className="fade-in">
            <img src={avatar?.url} loading={loading}
              width={avatarWidth} height={avatarHeight}
              alt={content?.title || 'A image'}  />
          </picture>
        </div>
      }
      <div className={styles.content}>
        <h1 className={styles.title}>{content?.title}</h1>
        {content?.description &&
          <p className={styles.description}>{content?.description}</p>
        }
      </div>
    </a>
  );
}
