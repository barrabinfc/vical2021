export type SEOModules = "ld" | "og" | "twitter";
export type SEOSchema = "basic" | "article" | "nadica";

export interface SEOItem {
  schema: SEOSchema;
  permalink: string;

  author?: Person;
  title: string;
  description: string;
  content?: string;

  images: string[];
  dateModified?: string;
  datePublished?: string;
}
