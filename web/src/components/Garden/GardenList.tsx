import React from 'react';
import { cn, toDMYDateString, emojifyStatus } from '../../lib/helpers';
import { Page } from '../../lib/page';
import Tag, { TagVariant } from '../Tag/Tag';

import style from './GardenList.module.scss';

export enum GardenListVariant {
  DEFAULT = 'default',
  WITH_SUBTITLE = 'with-subtitle',
  WITH_DESCRIPTION = 'with-description'
}

export interface GardenListProps {
  items: Page[];
  className?: string | string[];
  variant?: GardenListVariant;
}

export const GardenList = ({ items, variant = GardenListVariant.DEFAULT }: GardenListProps) => {
  return (
    <ul className={cn(style['garden-list'])}>
      {items.map(garden => (
        <li className={cn(garden.slug, 'list-item')} key={garden.slug}>
          <a href={garden.url.pathname} className={cn(style['garden-item'])}>
            <div className={cn('title4', style['item-title'])}>{garden.content.title}</div>
            <div className="extra-container">
              {garden.collection?.length > 0 && (
                <span className="tags-container" aria-label="in collection">
                  <Tag className="collection">{garden.collection}</Tag>
                </span>
              )}
              <time
                className="publishedAt"
                dateTime={garden.publishedAt.toString()}
                aria-label={`Published at: ${toDMYDateString(garden.publishedAt)}`}
              >
                {toDMYDateString(garden.publishedAt)}
              </time>
              <Tag className="status" variant={TagVariant.TRANSPARENT} aria-label={garden.status}>
                {emojifyStatus(garden.status)}
              </Tag>
            </div>
            {variant === GardenListVariant.WITH_SUBTITLE && (
              <div className={cn('item-subtitle', style['item-subtitle'])}>{garden.content.subtitle}</div>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default GardenList;
