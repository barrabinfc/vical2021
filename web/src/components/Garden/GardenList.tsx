import React from 'react';
import { cn, toDMYDateString, emojifyStatus } from '../../lib/helpers';
import { Page } from '../../lib/page';
import Tag, { TagVariant } from '../Tag/Tag';

import style from './GardenList.module.scss';

export const GardenList = ({ items }: { items: Page[] }) => {
  return (
    <ul className={cn(style['garden-list'])}>
      {items.map(garden => (
        <li className={cn(garden.slug)} key={garden.slug}>
          <div className={cn(style['garden-item'])}>
            <h4 className={cn(style['title'])}>
              <a href={garden.url.pathname} className={cn(style['link-title'])}>
                {garden.content.title}
              </a>
            </h4>
            {garden.collection?.length > 0 && (
              <span className="tags-container" aria-label="in collection">
                <Tag className="collection">{garden.collection}</Tag>
              </span>
            )}
            <div className="extra-container">
              <span className="publishedAt" aria-label={`Published at: ${toDMYDateString(garden.publishedAt)}`}>
                <em>{toDMYDateString(garden.publishedAt)}</em>
              </span>
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
