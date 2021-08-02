/// <reference types="react-scripts" />
declare module "react-lorem-ipsum";

interface ImportMeta {
  globEager(string): Promise<NodeModule>;
}

import Router from "~/components/Router/Router";
declare global {
  declare module "*.module.css";
  declare module "*.module.scss";

  interface Window {
    router: Router;
  }
}
