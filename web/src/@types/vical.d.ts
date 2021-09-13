type HTMLString = string;

/**  Article has title & description */
interface Article {
  title: string;
  description: string;
  images: string[];
}

interface Person {
  name: string;
}

/** Implements a render method that returns html string */
interface Renderable {
  (props: any): JSX.Element;
}

interface AstroMarkdownPage {
  frontmatter: Record<string, any>;
  astro: {
    headers: any[];
    source: string;
    html: string;
  };
  content: string;
}
