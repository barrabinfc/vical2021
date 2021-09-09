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
  name: string;
  abspath: string;
  slug: string;
  path: string;
  schema: string;
  layout: string;
  status: "draft" | "in progress" | "complete";
  published: boolean;
  publishedAt: UnixTimestamp;

  content: {
    title: string;
    description: string;
    frontmatter: Record<any, string>;
    headers: any[];
    content: string;
  };

  thumbnail?: {
    url: string;
  };
}

interface GardenPage extends MarkdownPage {
  /** Is part of a collection(aka folder?) ?  */
  collection: string[] | null;
}
