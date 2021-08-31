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

/**
 * A page in markdown.
 * Every page must have those fields.
 */
interface MarkdownPage {
  slug: string;
  path: string;
  schema: string;
  layout: string;
  draft: boolean;

  avatar: {
    url: string;
  };
  content: {
    title: string;
    description: string;
    frontmatter: Record<any, string>;
    headers: any[];
    content: string;
  };
}
