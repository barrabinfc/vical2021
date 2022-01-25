/// <reference lib="dom" />
/// <reference path="./types/importMeta.d.ts" />
import { Opaque } from "type-fest";

// CSS modules
type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.module.css" {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module "*.module.pcss" {
  const classes: CSSModuleClasses;
  export default classes;
}

/**
 * Environment variables interface
 */
type ENV = {
  FF: {
    ServiceWorker: boolean;
  };
};

declare global {
  type UnixTimestamp = Opaque<number, "UnixTimestamp">;
  interface Window {
    ENV: ENV;
  }
}
