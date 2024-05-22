// @ts-check
// import RemoteAssets from 'vite-plugin-remote-assets';

/** @type {import('astro').AstroUserConfig} */
export default {
  renderers: ['@astrojs/renderer-react'],
  buildOptions: {
    site: 'http://vical.me/'
  },
  vite: {
    // plugins: [RemoteAssets()]
  }
};
