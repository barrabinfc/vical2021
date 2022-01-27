import { Page } from '~/lib/page';

import Tag from './Tag';
export default Tag;

/**
 * Convert a status to a emoji
 */
export const emojifyGardenItemStatus = (status: Page['status']): string => {
  switch (status) {
    case 'draft':
      return '🌱';
    case 'in progress':
      return '🌿';
    case 'complete':
      return '🌳';
    default:
      return '❌';
  }
};
