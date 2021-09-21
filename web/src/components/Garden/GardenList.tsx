import React from 'react';
import { cn, toDMYDateString, emojifyStatus } from '../../lib/helpers';
import { Page } from '../../lib/page';
import Tag, { TagVariant } from '../Tag/Tag';

import style from './GardenList.module.scss';

export const GardenList = ({ items }: { items: Page[] }) => {
  return (
    <ul className={cn(style['garden-list'])}>
      {items.map(garden => (
        <li className={cn(garden.slug, 'list-item')} key={garden.slug}>
          <div className={cn(style['garden-item'])}>
            <div className={cn('title4', style['title'])}>
              <a href={garden.url.pathname} className={cn(style['link-title'])}>
                {garden.content.title}
              </a>
            </div>
            {garden.collection?.length > 0 && (
              <span className="tags-container" aria-label="in collection">
                <Tag className="collection">{garden.collection}</Tag>
              </span>
            )}
            <div className="extra-container">
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
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GardenList;
