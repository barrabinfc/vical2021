/// <reference types="react-scripts" />
declare module 'react-lorem-ipsum';
import { Settings } from '../hooks/useSharedSettings';
import Router from '~/components/Router/Router';

declare global {
  declare module '*.module.css';
  declare module '*.module.scss';

  declare module '*.png' {
    const value: any;
    export = value;
  }
  declare module '*.jpg' {
    const value: any;
    export = value;
  }

  interface Window {
    router: Router;
    settings: Settings;
  }

  interface ImportMeta {
    globEager(string): Promise<NodeModule>;
  }
}

import { Opaque } from 'type-fest';
declare global {
  type UnixTimestamp = Opaque<number, 'UnixTimestamp'>;
}
