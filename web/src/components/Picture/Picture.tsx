import React from 'react';

interface PictureProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * A picture with webP
 */
export const Picture = ({ src, width, height, alt }: PictureProps) => {
  const webPImageSrc = src.split('.')[0] + '.webp';
  return (
    <picture>
      <source type="image/webp" srcSet={webPImageSrc} />
      <img src={src} alt={alt ?? ''} width={width} height={height} />
    </picture>
  );
};

export default Picture;
