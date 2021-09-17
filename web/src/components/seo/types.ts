export type SEOModules = 'ld' | 'og' | 'twitter';
export type SEOSchema = 'basic' | 'article' | 'ClaimReview' | 'HowTo';

export interface SEOItem {
  schema: SEOSchema;
  permalink: string;

  author?: string;
  title: string;
  description: string;

  content?: string;
  images: string[];

  datePublished?: string;
}
