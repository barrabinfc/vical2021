export interface AstroMarkdownPage {
  astro: {
    headers: string[];
    source: string;
    html: string;
  };
  url: string;
  [key: string]: any;
}

export class Astro {
  fetchContent(string): AstroMarkdownPage[];
}
