/// <reference types="react-scripts" />
declare module "react-lorem-ipsum";

import Router from "~/components/Router/Router";
declare global {
  declare module "*.module.css";
  declare module "*.module.scss";

  interface Window {
    router: Router;
  }

  interface ImportMeta {
    globEager(string): Promise<NodeModule>;
  }
}

import { Opaque } from "type-fest";
declare global {
  type UnixTimestamp = Opaque<number, "UnixTimestamp">;
}
