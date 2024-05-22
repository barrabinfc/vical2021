type HTMLString = string;

/**  Article has title & description */
interface Article {
  title: string;
  description: string;
  images: string[];
}

/** Implements a render method that returns html string */
interface Renderable {
  (props: any): JSX.Element;
}
