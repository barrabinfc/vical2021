import React from 'react';

import styles from './Gallery.module.scss';

export interface GalleryProps {
  children: React.ReactElement | React.ReactElement[];
}

export type props = GalleryProps;

/**
 * Render a photo gallery, one item per 'page'.
 * default's to occupy max width of container.
 */
export const Gallery = ({ children }: GalleryProps) => {
  return <div className={styles.gallery}>{children}</div>;
};

export default Gallery;
