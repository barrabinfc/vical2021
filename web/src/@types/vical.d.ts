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

interface Work {
  route: string;
  href: string;
  avatar: {
    url: string;
    width: number;
    height: number;
  };
  content: {
    title: string;
    description: string;
  };
}
